import { Document } from "mongoose";
export interface IEvent extends Document {
  title?: string;
  time?: string;
  message_id?: string;
  users?: object;
  yes?: string[];
  no?: string[];
}
