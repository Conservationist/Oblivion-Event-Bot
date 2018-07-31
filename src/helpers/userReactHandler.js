import Database from "../models/eventModel";

export default async function userReactHandler(userid, messageid, type) {
  /* find the event via messsage id */
  const event = await Database.find({ Message_id: messageid });
  /* check if event exists or not */
  if (event.length < 1 || !event) return;
  /* ignore the bot ;) */
  if (userid === bot_id) return;
  if (userid === "123796658516525056") return;
  /* see if the user is already in the db, so people don't keep reacting. */
  if (type === "no") {
    if (
      event[0].Users.no.includes(userid) === false &&
      event[0].Users.yes.includes(userid) === true
    )
      return this.removeYesUserFromEvent(userid, messageid);
    if (event[0].Users.no.includes(userid) === false)
      return this.addNoUserToEvent(userid, messageid);
  }
  if (type === "yes") {
    if (
      event[0].Users.no.includes(userid) === true &&
      event[0].Users.yes.includes(userid) === false
    )
      return this.removeNoUserFromEvent(userid, messageid);
    if (event[0].Users.yes.includes(userid) === false)
      return this.addYesUserToEvent(userid, messageid);
  }
}
