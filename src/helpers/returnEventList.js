import Database from "../models/eventModel";

export default async function returnEventList(eventid, type) {
  if (!type) return; //ADD LOG IN THIS FOLDER! @important
  const event = await Database.find({ Id: eventid });
  if (event.length < 1 || !event) return;
  if (type === "yes") {
    if (event[0].Users.yes.length === 0) return { err: true };
    return {
      id: eventid,
      usersArr: event[0].Users.yes,
      title: event[0].Title,
      err: false
    };
  } else if (type === "no") {
    if (event[0].Users.no.length === 0) return { err: true };
    return {
      id: eventid,
      usersArr: event[0].Users.no,
      title: event[0].Title,
      err: false
    };
  }
}
