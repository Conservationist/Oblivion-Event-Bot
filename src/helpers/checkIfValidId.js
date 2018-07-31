import Database from "../models/eventModel";

export default async function checkIfValidId(eventid) {
  const event = await Database.find({ Id: eventid });
  if (event.length < 1 || !event) return false;
  else return true;
}
