import mongoose from "mongoose";

const schema = new mongoose.Schema({
  eventChannel: {
    horde: { type: String, required: false },
    alliance: { type: String, required: false }
  },
  listChannel: {
    horde: { type: String, required: false },
    alliance: { type: String, required: false }
  },
  announceChannel: {
    horde: { type: String, required: false },
    alliance: { type: String, required: false }
  }
});

export default mongoose.model("Settings", schema, "Settings");
