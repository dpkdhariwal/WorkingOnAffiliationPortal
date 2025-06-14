/* eslint-disable no-undef */
import express from "express";
const router = express.Router();
import cors from "cors"; // Import the cors middleware
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || "";

import { createServer } from "node:http";
import { Server } from "socket.io";

import auth from "./routes/auth.js";
import task from "./routes/task.js";

const app = express();
// Enable CORS for all routes

const allowedOrigins = ["http://localhost:9000", "http://localhost:5173"];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you need to allow credentials (cookies, etc.)
  })
);

app.get("/", (req, res) => {
  res.json({ userid: 1111 });
});

app.get("/WebToaken", (req, res) => {
  var token = jwt.sign({ foo: "bar" }, "shhhhh");
  res.json({ webToken: token });
});

app.use("/auth", auth);
app.use("/task", task);

app.use((req, res) => {
  res.status(404).send("Route Not Found");
});
app.use((req, res) => {
  res.status(505).send("Server Error");
});

const server = createServer(app);
// const io = new Server(server);
// server-side
const io = new Server(server, {
  cors: {
    origin: origin,
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.use((socket, next) => {
  if (socket.request) {
    next();
  } else {
    next(new Error("invalid"));
  }
});

// eslint-disable-next-line no-unused-vars
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
