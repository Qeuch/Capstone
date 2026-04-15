const express = require("express");
const server = express();
const port = 3000;
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

// uncomment these later once we have them added
const { DB_URI } = process.env;
const { SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// connect to DB
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes n stuff
server.get("/main", (request, response) => {
  response.send("LIVE!");
});

// Not authorized
server.get("/not-authorized", (request, response) => {
  response.status(401);
  response.send("NOT AUTHORIZED!");
});

server.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
});

// // Get players
// server.get("/players", async (request, response) => {
//   console.log("GET /players hit");
//   try {
//     await Player.find().then((result) => response.status(200).send(result));
//   } catch (error) {
//     console.log(error.message);
//   }
// });

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

//Adding Games to schedule
server.post("/games", async (req, res) => {
  try {
    const {
      game_date,
      home_team,
      away_team,
      home_score,
      away_score,
      weather_conditions,
    } = req.body;

    const newGame = new Game({
      _id: new mongoose.Types.ObjectId().toString(),
      game_date,
      home_team,
      away_team,
      home_score,
      away_score,
      weather_conditions,
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Error creating game" });
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
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

server.get("/api/players/test", (req, res) => {
  res.send("working");
});

// Get players from the DB (protected)
server.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).send(err);
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
    console.log("ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// always at the end
// commenting this out for now. I dont know what it's meant to do, but "*" isn't a valid path for a server.get

// server.get("*", (request, response) => {
//   response.status(401);
//   response.send("hell naw");
// });
