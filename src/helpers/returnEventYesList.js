import Database from "../models/eventModel";

export default async function returnEventYesList(eventid) {
  const event = await Database.find({ Id: eventid });
  if (event.length < 1 || !event) return;
  if (event[0].Users.yes.length === 0) return { err: true };
  return {
    id: eventid,
    usersArr: event[0].Users.yes,
    title: event[0].Title,
    err: false
  };
}
