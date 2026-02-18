-- =========================
-- Teachers
-- =========================
CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT
);

CREATE INDEX IF NOT EXISTS idx_teachers_language
ON teachers(language);


-- =========================
-- Availability Slots
-- =========================
CREATE TABLE IF NOT EXISTS availability_slots (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  weekdays_json TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  time_zone TEXT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE INDEX IF NOT EXISTS idx_availability_teacher
ON availability_slots(teacher_id);


-- =========================
-- Courses
-- =========================
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  group_reference TEXT NOT NULL,
  time_zone TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE INDEX IF NOT EXISTS idx_courses_teacher
ON courses(teacher_id);


-- =========================
-- Course Sessions
-- =========================
CREATE TABLE IF NOT EXISTS course_sessions (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  start_datetime TEXT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_course
ON course_sessions(course_id);

CREATE INDEX IF NOT EXISTS idx_sessions_start
ON course_sessions(start_datetime);


-- =========================
-- Blockers
-- =========================
CREATE TABLE IF NOT EXISTS blockers (
  id TEXT PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  start_datetime TEXT NOT NULL,
  end_datetime TEXT NOT NULL,
  time_zone TEXT NOT NULL,
  reason TEXT,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE INDEX IF NOT EXISTS idx_blockers_teacher
ON blockers(teacher_id);
