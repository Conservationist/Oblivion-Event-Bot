import { Schema, Model, model } from "mongoose";
import { IEvent } from "./interfaces/event";

export const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  message_id: { type: String, required: false },
  users: {
    yes: { type: Array, default: [] },
    no: { type: Array, default: [] }
  }
});
const Event: Model<IEvent> = model<IEvent>("Events", eventSchema, "Events");
export default Event;
// export default model("Event", schema, "Events");
