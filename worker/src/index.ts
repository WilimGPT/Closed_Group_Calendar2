import { Hono } from "hono";

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// =========================
// GET /api/:language
// Returns teachers, availability, courses, sessions, blockers
// =========================
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
    // ---------- Availability ----------
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

    // ---------- Courses ----------
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

    // ---------- Blockers ----------
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
// POST /api/:language/add-availability/
// Body:
// {
//   "teacherId": "en_t1",
//   "slot": { id, weekdays, startTime, endTime, startDate, endDate, timeZone }
// }
// =========================
const addAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = (await c.req.json()) as {
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

  // Ensure teacher belongs to this language
  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json(
      { ok: false, error: "Teacher not found for this language" },
      404
    );
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
// POST /api/:language/update-availability/
// Body (from frontend now):
// {
//   "teacherId": "en_t1",
//   "slotId": "en_t1_a1",
//   "updatedSlot": { weekdays, startTime, endTime, startDate, endDate, timeZone }
// }
// (or older shape with "slot")
// =========================
const updateAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = (await c.req.json()) as {
    teacherId: string;
    slotId: string;
    slot?: {
      id?: string;
      weekdays: number[];
      startTime: string;
      endTime: string;
      startDate: string;
      endDate: string;
      timeZone: string;
    };
    updatedSlot?: {
      weekdays: number[];
      startTime: string;
      endTime: string;
      startDate: string;
      endDate: string;
      timeZone: string;
    };
  };

  const { teacherId, slotId } = body;
  const slot = body.slot ?? body.updatedSlot;

  if (!teacherId || !slotId || !slot) {
    return c.json(
      { ok: false, error: "Missing teacherId, slotId or slot/updatedSlot" },
      400
    );
  }

  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json(
      { ok: false, error: "Teacher not found for this language" },
      404
    );
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
// POST /api/:language/delete-availability/
// Body:
// { "teacherId": "en_t1", "slotId": "en_t1_a1" }
// =========================
const deleteAvailabilityHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");

  const body = (await c.req.json()) as {
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
    return c.json(
      { ok: false, error: "Teacher not found for this language" },
      404
    );
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

// =========================
// BOOK COURSE (CREATE)
// POST /api/:language/book/:teacherId
// Body (from AvailabilityChecker.submitCourse):
// {
//   "teacherId": "en_t1",
//   "groupReference": "Group 123",
//   "timeZone": "Europe/Warsaw",
//   "durationMinutes": 60,
//   "sessions": [
//     { "id": "course_s1", "startDateTime": "2026-01-15T09:00+01:00" },
//     ...
//   ]
// }
// =========================
const bookCourseHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");
  const teacherIdFromPath = c.req.param("teacherId");

  const body = (await c.req.json()) as {
    teacherId: string;
    groupReference: string;
    timeZone: string;
    durationMinutes: number;
    sessions: { id?: string; startDateTime: string }[];
  };

  const teacherId = body.teacherId || teacherIdFromPath;

  if (
    !teacherId ||
    !body.groupReference ||
    !body.timeZone ||
    !body.durationMinutes ||
    !body.sessions ||
    !body.sessions.length
  ) {
    return c.json({ ok: false, error: "Missing required booking fields" }, 400);
  }

  if (teacherIdFromPath && teacherIdFromPath !== teacherId) {
    return c.json(
      { ok: false, error: "teacherId mismatch between path and body" },
      400
    );
  }

  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json(
      { ok: false, error: "Teacher not found for this language" },
      404
    );
  }

  // Determine next course id like "en_t1_b3"
  const coursesResult = await db
    .prepare("SELECT id FROM courses WHERE teacher_id = ?")
    .bind(teacherId)
    .all();

  let nextIndex = 1;
  for (const row of coursesResult.results as any[]) {
    const match = String(row.id).match(/_b(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (!Number.isNaN(n) && n >= nextIndex) {
        nextIndex = n + 1;
      }
    }
  }

  const courseId = `${teacherId}_b${nextIndex}`;

  // Insert course
  await db
    .prepare(
      `INSERT INTO courses (id, teacher_id, group_reference, time_zone, duration_minutes)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(
      courseId,
      teacherId,
      body.groupReference,
      body.timeZone,
      body.durationMinutes
    )
    .run();

  // Insert sessions
  for (let i = 0; i < body.sessions.length; i++) {
    const session = body.sessions[i];
    if (!session.startDateTime) continue;

    const sessionId = `${courseId}_course_s${i + 1}`;

    await db
      .prepare(
        `INSERT INTO course_sessions (id, course_id, start_datetime)
         VALUES (?, ?, ?)`
      )
      .bind(sessionId, courseId, session.startDateTime)
      .run();
  }

  return c.json({ ok: true, id: courseId });
};

app.post("/api/:language/book/:teacherId", bookCourseHandler);
app.post("/api/:language/book/:teacherId/", bookCourseHandler);

// =========================
// UPDATE COURSE
// POST /api/:language/update-course/:courseId
// Body (from ViewAvailability.handleCourseSave):
// {
//   "teacherId": "en_t1",
//   "groupReference": "Group 123",
//   "timeZone": "Europe/Warsaw",
//   "durationMinutes": 60,
//   "sessions": [
//     { "id": "en_t1_b1_course_s1", "startDateTime": "..." },
//     ...
//   ]
// }
// We update course info, wipe existing sessions for that course,
// and re-insert the new list.
// =========================
const updateCourseHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");
  const courseId = c.req.param("courseId");

  const body = (await c.req.json()) as {
    teacherId: string;
    groupReference: string;
    timeZone: string;
    durationMinutes: number;
    sessions: { id?: string; startDateTime: string }[];
  };

  const { teacherId, groupReference, timeZone, durationMinutes, sessions } =
    body;

  if (
    !teacherId ||
    !groupReference ||
    !timeZone ||
    !durationMinutes ||
    !sessions ||
    !sessions.length
  ) {
    return c.json({ ok: false, error: "Missing required course fields" }, 400);
  }

  // Ensure course exists
  const existingCourse = await db
    .prepare("SELECT * FROM courses WHERE id = ?")
    .bind(courseId)
    .first();

  if (!existingCourse) {
    return c.json({ ok: false, error: "Course not found" }, 404);
  }

  // Ensure teacher is valid for this language
  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(teacherId, language)
    .first();

  if (!teacher) {
    return c.json(
      { ok: false, error: "Teacher not found for this language" },
      404
    );
  }

  // Update core course info (including reassigned teacher)
  await db
    .prepare(
      `UPDATE courses
       SET teacher_id = ?, group_reference = ?, time_zone = ?, duration_minutes = ?
       WHERE id = ?`
    )
    .bind(teacherId, groupReference, timeZone, durationMinutes, courseId)
    .run();

  // Blow away existing sessions for this course and re-insert
  await db
    .prepare("DELETE FROM course_sessions WHERE course_id = ?")
    .bind(courseId)
    .run();

  for (let i = 0; i < sessions.length; i++) {
    const s = sessions[i];
    if (!s.startDateTime) continue;

    const sessionId =
      (s.id && s.id.trim().length ? s.id : `${courseId}_course_s${i + 1}`);

    await db
      .prepare(
        `INSERT INTO course_sessions (id, course_id, start_datetime)
         VALUES (?, ?, ?)`
      )
      .bind(sessionId, courseId, s.startDateTime)
      .run();
  }

  return c.json({ ok: true });
};

app.post("/api/:language/update-course/:courseId", updateCourseHandler);
app.post("/api/:language/update-course/:courseId/", updateCourseHandler);

// =========================
// DELETE COURSE
// POST /api/:language/delete-course/:courseId
// Body (optional):
// { "teacherId": "en_t1" }  // not strictly required, we infer from course
//
// Deletes:
// - all sessions in course_sessions for that course_id
// - the course row itself
// =========================
const deleteCourseHandler = async (c: any) => {
  const db = c.env.DB;
  const language = c.req.param("language");
  const courseId = c.req.param("courseId");

  // Look up course
  const course = await db
    .prepare("SELECT * FROM courses WHERE id = ?")
    .bind(courseId)
    .first();

  if (!course) {
    return c.json({ ok: false, error: "Course not found" }, 404);
  }

  // Ensure course's teacher belongs to this language
  const teacher = await db
    .prepare("SELECT * FROM teachers WHERE id = ? AND language = ?")
    .bind(course.teacher_id, language)
    .first();

  if (!teacher) {
    return c.json(
      { ok: false, error: "Course does not belong to this language" },
      400
    );
  }

  // Delete sessions first (FK safety)
  await db
    .prepare("DELETE FROM course_sessions WHERE course_id = ?")
    .bind(courseId)
    .run();

  // Delete course
  await db
    .prepare("DELETE FROM courses WHERE id = ?")
    .bind(courseId)
    .run();

  return c.json({ ok: true });
};

app.post("/api/:language/delete-course/:courseId", deleteCourseHandler);
app.post("/api/:language/delete-course/:courseId/", deleteCourseHandler);

export default app;
