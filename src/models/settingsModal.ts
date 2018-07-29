import { Schema, Model, model } from "mongoose";
import { ISettings } from "./interfaces/settings";

const settingsSchema: Schema = new Schema({
  event_channel: { type: String, required: false, default: null },
  list_channel: { type: String, required: false, default: null }
});

const Event: Model<ISettings> = model<ISettings>(
  "Settings",
  settingsSchema,
  "Settings"
);
export default Event;

// export const eventSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   time: { type: String, required: true },
//   id: { type: String, required: true },
//   message_id: { type: String, required: false },
//   users: {
//     yes: { type: Array, default: [] },
//     no: { type: Array, default: [] }
//   }
// });
