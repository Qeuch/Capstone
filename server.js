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

// routes n stuff
server.get("/main", (request, response) => {
  response.send("LIVE!");
});

// Not authorized
server.get("/not-authorized", (request, response) => {
  response.status(401);
  response.send("NOT AUTHORIZED!");
});

// Get players
server.get("/players", async (request, response) => {
  console.log("GET /players hit");
  try {
    await Player.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// Get games
server.get("/games", async (request, response) => {
  console.log("GET /games hit");
  try {
    await Game.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// Get teams
server.get("/teams", async (request, response) => {
  console.log("GET /teams hit");
  try {
    await Team.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// Register new user
server.post("/create-user", async (request, response) => {
  // Uncomment this for testing the register - tristan
  // console.log(request.body);
  const { username, email, password } = request.body;

  if (!username || !password || !email) {
    return response.status(400).send({ message: "Missing fields" });
  } else {
    try {
      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        _id: id,
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      response.send({ message: "User Created!" });
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send({ message: "User Already Exists, please find another username" });
    }
  }
});

// Adding Player

server.post("/add-player", async (request, response) => {
  const { playerName, age, image, role } = request.body; // just change the variable naming here if i didn't get it right
  const id = crypto.randomUUID();
  const player = new Player({
    playerName,
    age,
    image,
    role,
  });

  //Server's response to player being added
  try {
    await player.save();
    response.status(201).json({ message: "Player added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Delete player
server.delete("/players/:id", async (request, response) => {
  const { id } = request.params;
  //Server's response to a player being deleted
  try {
    const result = await Player.findByIdAndDelete(id);
    response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
  }
});

// Edit player
server.patch("/edit-player/:id", async (request, response) => {
  const playerId = request.params.id;
  const { playerName, image, age, role, id } = request.body;

  //Server's response to a player being editted
  try {
    await Player.findByIdAndUpdate(playerId, {
      playerName,
      image,
      age,
      role,
    }).then((result) =>
      response.status(200).send(`${playerName} edited\nwith id: ${playerId}`),
    );
  } catch (error) {
    console.log(error.message);
  }
});

// Login existing user route
server.post("/", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).send({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response
        .status(403)
        .send({ message: "Incorrect username or password" });
    }

    const jwtToken = jwt.sign(
      { id: user._id, username, role: user.role },
      SECRET_KEY,
    );
    return response
      .status(201)
      .send({ message: "User Authenticated", token: jwtToken });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    response.status(500).send({ message: error.message });
  }
});

// Checking JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "No token provided" });

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

server.get("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// always at the end
// commenting this out for now. I dont know what it's meant to do, but "*" isn't a valid path for a server.get

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