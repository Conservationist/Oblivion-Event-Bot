import { Document } from "mongoose";
export interface ISettings extends Document {
  event_channel?: string;
  list_channel?: string;
}
