import { pool } from "../db/pool.js";

/**
 * POST /api/poll/submit
 * Body: { answers: { [stepId]: optionId, ... } }
 */
export async function submitPoll(req, res) {
  const { answers } = req.body;

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return res.status(400).json({
      message: "Request body must include an `answers` object.",
    });
  }

  if (Object.keys(answers).length === 0) {
    return res.status(400).json({ message: "`answers` cannot be empty." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO poll_responses (answers) VALUES ($1) RETURNING id, created_at`,
      [answers]
    );

    const row = result.rows[0];
    return res.status(201).json({ id: row.id, createdAt: row.created_at });
  } catch (err) {
    console.error("Failed to save poll response:", err.message);
    return res.status(500).json({ message: "Could not save your response. Please try again." });
  }
}

/**
 * GET /api/poll/responses
 * Lists the most recent submissions — handy for sanity-checking persistence.
 */
export async function listResponses(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, answers, created_at FROM poll_responses ORDER BY created_at DESC LIMIT 50`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch poll responses:", err.message);
    return res.status(500).json({ message: "Could not fetch responses." });
  }
}
