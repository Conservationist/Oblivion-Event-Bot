import Database from "../../models/eventModal";
import { Document } from "mongoose";
import { IEvent } from "../../models/interfaces/event";
import { Message } from "discord.js";

function createEvent(title: string, time: string, message: Message) {
  /* create a new event object*/
  const db_event: IEvent = new Database({
    Title: title,
    Time: time
  });
  /* save it to the DB, log any errors, notify when done + id */
  return db_event.save(err => {
    if (err) {
      console.error(err);
      return false;
    }
    // console.log(`EVENT ${id} SAVED TO DB`);
    // return m.channel.send("Created event with id of " + id + " sucessfully.");
  });
}

export default createEvent;
