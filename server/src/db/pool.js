import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Either provide a single DATABASE_URL, or the individual PG* vars below.
export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "postgres",
        database: process.env.PGDATABASE || "vexrim_poll",
      }
);

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err.message);
});
