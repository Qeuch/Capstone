const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  _id: String,

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },

  // Offense stats
  offense: {
    rushYard: {
      type: Number,
      default: null,
    },
    recYard: {
      type: Number,
      default: null,
    },
    passAtt: {
      type: Number,
      default: null,
    },
    passComp: {
      type: Number,
      default: null,
    },
  },

  // Defense stats
  defense: {
    tackles: {
      type: Number,
      default: null,
    },
    inter: {
      type: Number,
      default: null,
    },
    forFum: {
      type: Number,
      default: null,
    },
    block: {
      type: Number,
      default: null,
    },
    runYard: {
      type: Number,
      default: null,
    },
    passYard: {
      type: Number,
      default: null,
    },
    passAtt: {
      type: Number,
      default: null,
    },
    passComp: {
      type: Number,
      default: null,
    },
  },
});

const Player = mongoose.model("Player", playerSchema, "Players");
module.exports = Player;