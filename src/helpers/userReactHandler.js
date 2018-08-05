import Database from "../models/eventModel";
import { removeNoUserFromEvent, removeYesUserFromEvent, addNoUserToEvent, addYesUserToEvent } from "./index";


export default async function userReactHandler(userid, messageid, type) {
  /* find the event via messsage id */
  const event = await Database.find({ Message_id: messageid });
  /* check if event exists or not */
  if (event.length < 1 || !event) return;
  /* ignore the bot ;) */
  if (userid === "454313341624778763") return;
  /* ignore the turkinator ;) */
  if (userid === "123796658516525056") return;
  /* see if the user is already in the db, so people don't keep reacting. */
  if (type === "no") {
    if (
      event[0].Users.no.includes(userid) === false &&
      event[0].Users.yes.includes(userid) === true
    ) {
      return removeYesUserFromEvent(userid, messageid);
    }
    if (event[0].Users.no.includes(userid) === false && event[0].Users.yes.includes(userid) === false) {
      return addNoUserToEvent(userid, messageid);
    }
  }
  if (type === "yes") {
    if (
      event[0].Users.no.includes(userid) === true &&
      event[0].Users.yes.includes(userid) === false
    ) {
      return removeNoUserFromEvent(userid, messageid);
    }
    if (event[0].Users.yes.includes(userid) === false && event[0].Users.no.includes(userid) === false) {
      return addYesUserToEvent(userid, messageid);
    }
  }
}
