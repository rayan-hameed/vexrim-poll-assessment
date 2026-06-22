import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pool } from "./pool.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function setup() {
  const sql = readFileSync(join(__dirname, "schema.sql"), "utf-8");
  try {
    await pool.query(sql);
    console.log("✅ Database schema is ready (poll_responses table).");
  } catch (err) {
    console.error("❌ Failed to apply schema:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

setup();
