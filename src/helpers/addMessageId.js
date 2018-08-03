import Database from "../models/eventModel";

export default async function addMessageId(messageid, eventid) {
  const event = await Database.find({ Id: eventid });
  if (event.length < 1 || !event) return;
  if (!messageid) return false;
  return Database.updateOne(
    { _id: event[0]._id },
    { $set: { Message_id: messageid } }
  );
}
