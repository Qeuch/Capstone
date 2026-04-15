const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  _id: String,

  team_name: {
    type: String,
    default: null,
  },

  location: {
    type: String,
    default: null,
  },

  image: {
    type: String,
    default: null,
  },

  coaching_staff: {
    coach: {
      type: String,
      default: null,
    },
    assistant_coach: {
      type: String,
      default: null,
    },
  },

  player_positions: {
    offense: {
      quarterback: { type: String, default: null },
      wideReceiver1: { type: String, default: null },
      wideReceiver2: { type: String, default: null },
      center: { type: String, default: null },
      leftTackle: { type: String, default: null },
      leftGuard: { type: String, default: null },
      rightTackle: { type: String, default: null },
      rightGuard: { type: String, default: null },
      tightEnd1: { type: String, default: null },
      tightEnd2: { type: String, default: null },
      runningBack: { type: String, default: null },
      fullBack: { type: String, default: null },
    },

    defense: {
      defTackle1: { type: String, default: null },
      defTackle2: { type: String, default: null },
      defEnd1: { type: String, default: null },
      defEnd2: { type: String, default: null },
      midLineBack1: { type: String, default: null },
      midLineBack2: { type: String, default: null },
      outLineBack1: { type: String, default: null },
      outLineBack2: { type: String, default: null },
      cornerBack1: { type: String, default: null },
      cornerBack2: { type: String, default: null },
      freeSafety: { type: String, default: null },
      strongSafety: { type: String, default: null },
    },
  },

  scheduled_games: [
    {
      type: String,
      default: null,
    },
  ],
});

const Team = mongoose.model("Team", teamSchema, "TeamInfo");

module.exports = Team;
