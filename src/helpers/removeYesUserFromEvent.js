import Database from "../models/eventModel";

export default async function removeYesUserFromEvent(userid, messageid) {
  /* find the event via messsage id */
  const event = await Database.find({ Message_id: messageid });
  /* see if the event exists */
  if (event.length < 1 || !event) return;
  /* check to see if the user already exists */
  if (event[0].Users.no.includes(userid) === true) return;
  /* if it doesnt we map all users and find the users */
  return event[0].Users.yes.map(user => {
    if (user === userid) {
      /* when we find the user we remove the user from the yes array, and add it to x array */
      return Database.updateOne(
        { _id: event[0]._id },
        {
          $pull: { "Users.yes": userid },
          $push: {
            "Users.no": userid
          }
        },
        err => {
          if (err) return console.log(err);
        }
      );
    }
  });
}
