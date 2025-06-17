// Route for user login
import express from "express";
const router = express.Router();
import { pKeyPath } from "../common/common.js";
import fs from "fs";
import jwt from "jsonwebtoken";
const privateKey = fs.readFileSync(pKeyPath, "utf8");
router.use(express.json());

import { checkUser } from "../database/models/auth.js";
import { authenticateToken } from "../database/models/token.js";

router.post("/login", async (req, res) => {
  let result = checkUser(req);
  result
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(200);
      res.json(error);
    });
});

router.post("/tokenValidation", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // eslint-disable-next-line no-unused-vars
    jwt.verify(authHeader, privateKey, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      // req.user = decodedToken;
      res.status(200);
      res.json({ validate: true });
    });
  } else {
    return res.status(401).json({ error: "Authorization header missing" });
  }
});

export default router;
