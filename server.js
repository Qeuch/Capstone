const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const Player = require("./models/player");
const User = require("./models/user");
const Game = require("./models/game");
const Team = require("./models/team");
const Play = require("./models/play");

const { DB_URI, SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// =========================
// DB CONNECT
// =========================
mongoose
  .connect(DB_URI)
  .then(() =>
    server.listen(3000, () =>
      console.log("DB connected + server running")
    )
  )
  .catch(console.error);

// =========================
// AUTH MIDDLEWARE
// =========================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// =========================
// AUTH
// =========================
server.post("/create-user", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      _id: crypto.randomUUID(),
      username,
      email,
      password: hashed,
    });

    await user.save();
    res.json({ message: "User created" });
  } catch {
    res.status(500).json({ message: "User exists or error" });
  }
});

server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ message: "Bad credentials" });

  const token = jwt.sign(
    { id: user._id, username, role: user.role },
    SECRET_KEY
  );

  res.json({ message: "Authenticated", token });
});

// =========================
// PLAYERS
// =========================
server.get("/api/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// =========================
// GAMES / TEAMS
// =========================
server.get("/api/games", async (req, res) => {
  res.json(await Game.find());
});

server.get("/api/teams", async (req, res) => {
  res.json(await Team.find());
});

// =========================
// PLAY SYSTEM (SINGLE SOURCE OF TRUTH)
// =========================
server.post("/api/plays", authenticateToken, async (req, res) => {
  try {
    const { gameId, players, playType, yards } = req.body;

    const play = new Play({
      _id: crypto.randomUUID(),
      gameId,
      players,
      playType,
      yards,
      createdAt: new Date(),
    });

    await play.save();

    const primary = await Player.findById(players.primary);

    if (primary) {
      if (playType === "pass") {
        primary.stats.offense.passYard += yards;
        primary.stats.offense.passAtt += 1;
        if (yards > 0) primary.stats.offense.passComp += 1;
      }

      if (playType === "run") {
        primary.stats.offense.runYard += yards;
      }

      if (playType === "tackle") {
        primary.stats.defense.tackles += 1;
      }

      await primary.save();
    }

    if (players.secondary) {
      const secondary = await Player.findById(players.secondary);

      if (secondary && playType === "pass") {
        secondary.stats.offense.passYard += yards;
        await secondary.save();
      }
    }

    res.status(201).json({ message: "Play saved", play });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// TOP PLAYERS
// =========================
server.get("/api/stats/top", async (req, res) => {
  const { type } = req.query;

  const players =
    type === "offense"
      ? await Player.find().sort({ "stats.offense.passYard": -1 }).limit(3)
      : await Player.find().sort({ "stats.defense.tackles": -1 }).limit(3);

  res.json(players);
});