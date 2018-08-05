import Database from "../models/eventModel";

export default async function removeYesUserFromEvent(userid, messageid) {
  Database.updateOne(
    { Message_id: messageid },
    {
      $pull: { "Users.yes": userid },
      $push: {
        "Users.no": userid
      }
    }, (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return;
}
