import Database from "../models/eventModel";

export default async function addNoUserToEvent(userid, messageid) {
  return Database.updateOne(
    { Message_id: messageid },
    {
      $push: {
        "Users.no": userid
      }
    }
  );
}
