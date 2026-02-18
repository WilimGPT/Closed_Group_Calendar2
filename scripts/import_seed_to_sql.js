#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SEED_DIR = path.join(ROOT, "seed-data");
const OUT_FILE = path.join(ROOT, "migrations", "0002_seed_import.sql");

function sqlEscape(value) {
  if (value === null || value === undefined) return "NULL";
  // Numbers
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  // Booleans -> 0/1
  if (typeof value === "boolean") return value ? "1" : "0";
  // Strings
  const s = String(value).replace(/'/g, "''");
  return `'${s}'`;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// Try to normalise blocker date-times if you later add them.
// Supported shapes:
// - { startDateTime, endDateTime, timeZone, reason }
// - { startDate, startTime, endDate, endTime, timeZone, reason }
function normaliseBlocker(b) {
  const tz = b.timeZone || "UTC";

  let start = b.startDateTime;
  let end = b.endDateTime;

  if (!start && b.startDate && b.startTime) start = `${b.startDate}T${b.startTime}`;
  if (!end && b.endDate && b.endTime) end = `${b.endDate}T${b.endTime}`;

  return {
    id: b.id,
    start_datetime: start,
    end_datetime: end,
    time_zone: tz,
    reason: b.reason || null
  };
}

function collectSeedFiles() {
  if (!fs.existsSync(SEED_DIR)) {
    throw new Error(`seed-data folder not found at: ${SEED_DIR}`);
  }
  return fs
    .readdirSync(SEED_DIR)
    .filter((f) => f.toLowerCase().endsWith(".json"))
    .map((f) => path.join(SEED_DIR, f));
}

function main() {
  ensureDir(path.join(ROOT, "migrations"));

  const files = collectSeedFiles();

  let sql = "";
  sql += "-- Auto-generated seed import\n";
  sql += "-- Source: seed-data/*.json\n\n";
  sql += "PRAGMA foreign_keys = ON;\n";
  sql += "BEGIN TRANSACTION;\n\n";

  // Optional: wipe tables first (uncomment if you want every import to be a full reset)
  // sql += "DELETE FROM blockers;\n";
  // sql += "DELETE FROM course_sessions;\n";
  // sql += "DELETE FROM courses;\n";
  // sql += "DELETE FROM availability_slots;\n";
  // sql += "DELETE FROM teachers;\n\n";

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Your JSON top-level uses "language": "de" etc.
    // We store that value in teachers.language
    const language = data.language;

    const teachers = Array.isArray(data.teachers) ? data.teachers : [];

    sql += `-- =========================\n`;
    sql += `-- Seed from: ${path.basename(filePath)}\n`;
    sql += `-- language: ${language}\n`;
    sql += `-- =========================\n\n`;

    for (const t of teachers) {
      // Teachers
      sql +=
        "INSERT OR REPLACE INTO teachers (id, language, name, username) VALUES (" +
        [sqlEscape(t.id), sqlEscape(language), sqlEscape(t.name), "NULL"].join(", ") +
        ");\n";

      // Availability slots
      const slots = Array.isArray(t.availabilitySlots) ? t.availabilitySlots : [];
      for (const s of slots) {
        const weekdaysJson = JSON.stringify(Array.isArray(s.weekdays) ? s.weekdays : []);
        sql +=
          "INSERT OR REPLACE INTO availability_slots (id, teacher_id, weekdays_json, start_time, end_time, start_date, end_date, time_zone) VALUES (" +
          [
            sqlEscape(s.id),
            sqlEscape(t.id),
            sqlEscape(weekdaysJson),
            sqlEscape(s.startTime),
            sqlEscape(s.endTime),
            sqlEscape(s.startDate),
            sqlEscape(s.endDate),
            sqlEscape(s.timeZone)
          ].join(", ") +
          ");\n";
      }

      // Courses + sessions (your JSON uses "bookings")
      const bookings = Array.isArray(t.bookings) ? t.bookings : [];
      for (const c of bookings) {
        // Map JSON keys -> DB columns
        // JSON: groupReference, timeZone, durationMinutes
        sql +=
          "INSERT OR REPLACE INTO courses (id, teacher_id, group_reference, time_zone, duration_minutes) VALUES (" +
          [
            sqlEscape(c.id),
            sqlEscape(t.id),
            sqlEscape(c.groupReference || ""),
            sqlEscape(c.timeZone || "UTC"),
            sqlEscape(Number.isFinite(c.durationMinutes) ? c.durationMinutes : 0)
          ].join(", ") +
          ");\n";

        const sessions = Array.isArray(c.sessions) ? c.sessions : [];
        for (const sess of sessions) {
          // JSON: startDateTime
          sql +=
            "INSERT OR REPLACE INTO course_sessions (id, course_id, start_datetime) VALUES (" +
            [sqlEscape(`${c.id}_${sess.id}`), sqlEscape(c.id), sqlEscape(sess.startDateTime)].join(", ") +
            ");\n";
        }
      }

      // Blockers (currently empty in your example)
      const blockers = Array.isArray(t.blockers) ? t.blockers : [];
      for (const b of blockers) {
        const nb = normaliseBlocker(b);
        // Skip if missing required fields
        if (!nb.id || !nb.start_datetime || !nb.end_datetime) continue;

        sql +=
          "INSERT OR REPLACE INTO blockers (id, teacher_id, start_datetime, end_datetime, time_zone, reason) VALUES (" +
          [
            sqlEscape(nb.id),
            sqlEscape(t.id),
            sqlEscape(nb.start_datetime),
            sqlEscape(nb.end_datetime),
            sqlEscape(nb.time_zone),
            sqlEscape(nb.reason)
          ].join(", ") +
          ");\n";
      }

      sql += "\n";
    }

    sql += "\n";
  }

  sql += "COMMIT;\n";

  fs.writeFileSync(OUT_FILE, sql, "utf-8");
  console.log(`✅ Wrote seed SQL to: ${OUT_FILE}`);
  console.log("Next: run it with wrangler d1 execute ... --file=./migrations/0002_seed_import.sql");
}

main();
