import Database from "../models/eventModel";

export default async function removeNoUserFromEvent(userid, messageid) {
  Database.updateOne(
    { Message_id: messageid },
    {
      $pull: { "Users.no": userid },
      $push: {
        "Users.yes": userid
      }
    },
    err => {
      if (err) return console.log(err);
    }
  );
  return;
}
