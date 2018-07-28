import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Title: { type: String, required: true },
  Time: { type: String, required: true },
  Id: { type: String, required: true },
  Message_id: { type: String, required: false },
  Users: {
    yes: { type: Array, default: [] },
    no: { type: Array, default: [] }
  }
});

export default mongoose.model("Event", schema, "Events");
