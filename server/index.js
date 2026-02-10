require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// ✅ CORS (explicit methods/headers helps with browser preflight)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" })); // big JSON safe

// ✅ Reads from .env DATABASE_URL (Azure Postgres needs SSL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // ✅ IMPORTANT for Azure Postgres
});

// ✅ Health check
app.get("/api/health", (req, res) => {
  return res.json({ ok: true });
});

// ✅ Get latest report
app.get("/api/report/latest", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, target_person, payload, created_at
      FROM mynoted.dynamic_reports
      ORDER BY created_at DESC
      LIMIT 1;
    `);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("LATEST_REPORT_ERROR:", err);

    return res.status(500).json({
      error: "Failed to fetch latest report",
      details: err?.message || String(err),
      code: err?.code || null,
    });
  }
});

// ✅ Get report by id (handy for frontend routing)
app.get("/api/report/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `
      SELECT id, target_person, payload, created_at
      FROM mynoted.dynamic_reports
      WHERE id = $1
      LIMIT 1;
      `,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("REPORT_BY_ID_ERROR:", err);

    return res.status(500).json({
      error: "Failed to fetch report by id",
      details: err?.message || String(err),
      code: err?.code || null,
    });
  }
});

// ✅ Get employee report by employee_id from spectre.employee_reports
app.get("/api/employee-report/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    const { rows } = await pool.query(
      `SELECT run_id, employee_id, report_json, report_type, created_at
       FROM spectre.employee_reports
       WHERE employee_id = $1
       ORDER BY created_at DESC
       LIMIT 1;`,
      [employeeId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No report found for this employee" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("EMPLOYEE_REPORT_ERROR:", err);
    return res.status(500).json({
      error: "Failed to fetch employee report",
      details: err?.message || String(err),
      code: err?.code || null,
    });
  }
});

// ✅ Insert report (dynamic)
app.post("/api/report", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Invalid JSON payload" });
    }

    const targetPerson =
      payload?.meta?.targetPerson ||
      payload?.targetPerson ||
      "Unknown Person (ROLE UNKNOWN, COMPANY)";

    const { rows } = await pool.query(
      `INSERT INTO mynoted.dynamic_reports (target_person, payload)
       VALUES ($1, $2::jsonb)
       RETURNING id, created_at;`,
      [targetPerson, JSON.stringify(payload)]
    );

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("INSERT_REPORT_ERROR:", err);

    return res.status(400).json({
      error: "Failed to insert report",
      details: err?.message || String(err),
      code: err?.code || null,
    });
  }
});

// Optional: catch uncaught errors so the process doesn't silently die
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED_REJECTION:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT_EXCEPTION:", err);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log("✅ Server running on port", PORT));

