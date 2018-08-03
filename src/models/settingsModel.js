import mongoose from "mongoose";

const schema = new mongoose.Schema({
  eventChannel: { type: String, required: false },
  listChannel: { type: String, required: false, default: null },
  announce_channel: { type: String, required: false, default: null }
});

export default mongoose.model("Settings", schema, "Settings");
