import Database from "../models/eventModel";

export default async function addYesUserToEvent(userid, messageid) {
  /* find the event via messsage id */
  const event = await Database.find({ Message_id: messageid });
  /* check if event exists or not */
  if (event.length < 1 || !event) return false;
  /* see if the user is already in the db, so people don't keep reacting. */
  if (event[0].Users.yes.includes(userid) === true) return;
  /* limit to 30 people */
  if (event[0].Users.yes.length === 30) return;
  /* send the update req */
  return Database.updateOne(
    { _id: event[0]._id },
    {
      $push: {
        "Users.yes": userid
      }
    }
  );
}
