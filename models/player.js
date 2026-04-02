// This is for later once login is done and we are inside the main page
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema ({

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    jerseyNumber: {
      type: Number,
      required: true,
    },

    //height, weight, date of birth????

    position: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    team: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;