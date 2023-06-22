import express from "express";

import utils from "./handlers/utils";

const router = express.Router();

const userId = "1567";

router.get("/chatSessions", async (req, res) => {
  res.status(200).send([]);
});

router.post("/chatSessions/session/get", async (req, res) => {
  const reqdata = req.body;
  const { limit } = reqdata;

  res.status(200).send(utils.getSessions({ limit: parseInt(limit, 10) }));
});

router.post("/chatSessions/chat_history/get", async (req, res) => {
  const reqdata = req.body;
  const { session_id } = reqdata;

  res
    .status(200)
    .send(utils.getChatHistory({ session_id: parseInt(session_id, 10) }));
});

router.post("/chatSessions/session/create", async (req, res) => {
  const reqdata = req.body;
  const { temp, max_tokens, engine, title } = reqdata;

  res.status(200).send(utils.addSession({ temp, max_tokens, engine, title }));
});

router.post("/chatSessions/session/update", async (req, res) => {
  const reqdata = req.body;
  const { session_id, temp, max_tokens, engine, title } = reqdata;

  res.status(200).send(
    utils.updateSession({
      session_id: parseInt(session_id, 10),
      temp,
      max_tokens,
      engine,
      title,
    })
  );
});

router.post("/chatSessions/vox/completion", async (req, res) => {
  const reqdata = req.body;
  const { session_id, temperature, messages, max_tokens, engine } = reqdata;

  res.status(200).send(
    utils.voxCompletion({
      session_id: parseInt(session_id, 10),
      temperature,
      messages: JSON.parse(messages),
      max_tokens,
      engine,
    })
  );
});

export default router;
