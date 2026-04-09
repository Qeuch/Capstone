// This is for later once login is done and we are inside the main page
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
  player_picture: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  jersey_number: {
    type: Number,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },

  // Offense stats
  stats: {
    gamesPlayed: {
      type: Number,
    },
    gamesWon:{
      type: Number,
    },
    offense: {
      passYard: {
        type: Number,
        default: null,
      },
      runYard: {
        type: Number,
        default: null,
      },
      tackles: {
        type: Number,
        default: null,
      },
      passTD: {
        type: Number,
        default: null,
      },
      runTD: {
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
      fumble: {
        type: Number,
        default: null,
      },
      penYard: {
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
},
});

const Player = mongoose.model("Player", playerSchema, "Players");
module.exports = Player;