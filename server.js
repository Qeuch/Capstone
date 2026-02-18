const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// uncomment these later once we have them added
// const { DB_URI } = process.env;
// const { SECRET_KEY } = process.env;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// connect to DB

// routes n stuff
