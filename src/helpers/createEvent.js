import Database from "../models/eventModel";

export default function createEvent(title, time, id, m) {
  /* create a new event object*/
  const db_event = new Database({
    Title: title,
    Time: time,
    Id: id
  });
  /* save it to the DB, log any errors, notify when done + id */
  return db_event.save((err, channel) => {
    if (err) {
      console.error(err);
      return false;
    }
    console.log(`EVENT ${id} SAVED TO DB`);
    return m.channel.send("Created event with id of " + id + " sucessfully.");
  });
}
