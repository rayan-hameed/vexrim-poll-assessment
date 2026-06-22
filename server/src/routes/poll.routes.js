import { Router } from "express";
import { submitPoll, listResponses } from "../controllers/poll.controller.js";

const router = Router();

router.post("/submit", submitPoll);
router.get("/responses", listResponses);

export default router;
