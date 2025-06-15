// Route for user login
import express from "express";
const router = express.Router();
router.use(express.json());

import {
  submitQuestion,
  task,
  getTaskQuestion,
  updateQuesTimeTrake,
  getTaskInfo,
  getAllTask,
} from "../database/models/task.js";
import { authenticateToken } from "../database/models/token.js";
router.use(authenticateToken);
// const Task = require('');

router.post("/", async (req, res) => {
  res.json({ userid: 1111 });
});
router.post("/getAllTask", async (req, res) => {
  getAllTask(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/getTaskQuestion", async (req, res) => {
  getTaskQuestion(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/setTaskQuestion", async (req, res) => {
  updateQuesTimeTrake(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/submitQuestion", async (req, res) => {
  submitQuestion(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/getTaskInfo", async (req, res) => {
  getTaskInfo(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
