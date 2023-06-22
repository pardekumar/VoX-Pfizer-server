import express from "express";

import chatSessions from "./chatSessions";

const router = express.Router();

router.get("/health-check", (req, res) => {
  res.status(200).send("Health check passed");
});

router.use(chatSessions as any);

export default router;
