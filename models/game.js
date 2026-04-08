const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  _id: String,

  game_date: {
    type: Date,
    default: null,
  },

  home_team: {
    type: String,
    default: null,
  },

  away_team: {
    type: String,
    default: null,
  },

  home_score: {
    type: Number,
    default: null,
  },

  away_score: {
    type: Number,
    default: null,
  },

  weather_conditions: {
    type: String,
    default: null,
  },
});

const Game = mongoose.model("Game", gameSchema, "Games");

module.exports = Game;