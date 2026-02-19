import { Hono } from "hono";

type Env = {
  DB: D1Database;
};

const mapLanguageToDb = (languageFromRoute: string): string => {
  const map: Record<string, string> = {
    english: "en",
    spanish: "es",
    german: "de",
  };

  // If it already is a short code (en/es/de), just pass it through
  return map[languageFromRoute] || languageFromRoute;
};

const app = new Hono<{ Bindings: Env }>();

// Shared handler to fetch all data for a language
const getLanguageHandler = async (c: any) => {
  const language = c.req.param("language");
  const db = c.env.DB;

  const teachersResult = await db
    .prepare("SELECT * FROM teachers WHERE language = ?")
    .bind(language)
    .all();

  const teachers = teachersResult.results;
  const responseTeachers: any[] = [];

  for (const teacher of teachers) {
    // Availability slots
    const slotsResult = await db
      .prepare("SELECT * FROM availability_slots WHERE teacher_id = ?")
      .bind(teacher.id)
      .all();

    const availabilitySlots = slotsResult.results.map((slot: any) => ({
      id: slot.id,
      weekdays: JSON.parse(slot.weekdays_json),
      startTime: slot.start_time,
      endTime: slot.end_time,
      startDate: slot.start_date,
      endDate: slot.end_date,
      timeZone: slot.time_zone,
    }));

    // Courses
    const coursesResult = await db
      .prepare("SELECT * FROM courses WHERE teacher_id = ?")
      .bind(teacher.id)
      .all();

    const courses: any[] = [];

    for (const course of coursesResult.results) {
      const sessionsResult = await db
        .prepare(
          "SELECT * FROM course_sessions WHERE course_id = ? ORDER BY start_datetime"
        )
        .bind(course.id)
        .all();

      const sessions = sessionsResult.results.map((s: any) => ({
        id: s.id,
        startDateTime: s.start_datetime,
      }));

      courses.push({
        id: course.id,
        groupReference: course.group_reference,
        timeZone: course.time_zone,
        durationMinutes: course.duration_minutes,
        sessions,
      });
    }

    // Blockers
    const blockersResult = await db
      .prepare("SELECT * FROM blockers WHERE teacher_id = ?")
      .bind(teacher.id)
      .all();

    const blockers = blockersResult.results.map((b: any) => ({
      id: b.id,
      startDateTime: b.start_datetime,
      endDateTime: b.end_datetime,
      timeZone: b.time_zone,
      reason: b.reason,
    }));

    responseTeachers.push({
      id: teacher.id,
      name: teacher.name,
      availabilitySlots,
      bookings: courses,
      blockers,
    });
  }

  return c.json({
    language,
    teachers: responseTeachers,
    meta: {},
  });
};

// GET /api/:language and /api/:language/
app.get("/api/:language", getLanguageHandler);
app.get("/api/:language/", getLanguageHandler);

// =========================
// ADD AVAILABILITY
// POST /api/:language/add-availability
// =========================
const addAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = await c.req.json() as {
    teacherId: string;
    slot: {
      id: string;
      weekdays: number[];
      startTime: string;
      endTime: string;
      startDate: string;
      endDate: string;
      timeZone: string;
    };
  };


  const { teacherId, slot } = body;

  if (!teacherId || !slot || !slot.id) {
    return c.json({ ok: false, error: "Missing teacherId or slot.id" }, 400);
  }

  // Optional: ensure teacher belongs to this language
  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json({ ok: false, error: "Teacher not found for this language" }, 404);
  }

  const weekdaysJson = JSON.stringify(slot.weekdays || []);

  await db
    .prepare(
      `INSERT OR REPLACE INTO availability_slots 
       (id, teacher_id, weekdays_json, start_time, end_time, start_date, end_date, time_zone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      slot.id,
      teacherId,
      weekdaysJson,
      slot.startTime,
      slot.endTime,
      slot.startDate,
      slot.endDate,
      slot.timeZone
    )
    .run();

  return c.json({ ok: true });
};

app.post("/api/:language/add-availability", addAvailabilityHandler);
app.post("/api/:language/add-availability/", addAvailabilityHandler);

// =========================
// UPDATE AVAILABILITY
// POST /api/:language/update-availability
// Body (assumed):
// {
//   "teacherId": "es_t1",
//   "slotId": "es_t1_a1",
//   "slot": { ...updated values... }
// }
// =========================
const updateAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = await c.req.json() as {
    teacherId: string;
    slot: {
      id: string;
      weekdays: number[];
      startTime: string;
      endTime: string;
      startDate: string;
      endDate: string;
      timeZone: string;
    };
  };

  const { teacherId, slotId, slot } = body;

  if (!teacherId || !slotId || !slot) {
    return c.json({ ok: false, error: "Missing teacherId, slotId or slot" }, 400);
  }

  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json({ ok: false, error: "Teacher not found for this language" }, 404);
  }

  const weekdaysJson = JSON.stringify(slot.weekdays || []);

  await db
    .prepare(
      `UPDATE availability_slots
       SET weekdays_json = ?, start_time = ?, end_time = ?, 
           start_date = ?, end_date = ?, time_zone = ?
       WHERE id = ? AND teacher_id = ?`
    )
    .bind(
      weekdaysJson,
      slot.startTime,
      slot.endTime,
      slot.startDate,
      slot.endDate,
      slot.timeZone,
      slotId,
      teacherId
    )
    .run();

  return c.json({ ok: true });
};

app.post("/api/:language/update-availability", updateAvailabilityHandler);
app.post("/api/:language/update-availability/", updateAvailabilityHandler);

// =========================
// DELETE AVAILABILITY
// POST /api/:language/delete-availability
// Body (assumed):
// { "teacherId": "es_t1", "slotId": "es_t1_a1" }
// =========================
const deleteAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = await c.req.json() as {
    teacherId: string;
    slotId: string;
  };

  const { teacherId, slotId } = body;

  if (!teacherId || !slotId) {
    return c.json({ ok: false, error: "Missing teacherId or slotId" }, 400);
  }

  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json({ ok: false, error: "Teacher not found for this language" }, 404);
  }

  await db
    .prepare(
      "DELETE FROM availability_slots WHERE id = ? AND teacher_id = ?"
    )
    .bind(slotId, teacherId)
    .run();

  return c.json({ ok: true });
};

app.post("/api/:language/delete-availability", deleteAvailabilityHandler);
app.post("/api/:language/delete-availability/", deleteAvailabilityHandler);

export default app;
