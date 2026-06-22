import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/poll.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/poll", pollRoutes);

// Fallback 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Vexrim poll API listening on http://localhost:${PORT}`);
});
