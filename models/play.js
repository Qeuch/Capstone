const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
  _id: String,
  gameId: String,
  players: {
    primary: String,
    secondary: String,
  },
  playType: String,
  yards: Number,
  createdAt: Date,
});

module.exports = mongoose.model("Play", playSchema);