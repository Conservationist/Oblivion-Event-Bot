import Database from "../models/eventModel";

export default async function addYesUserToEvent(userid, messageid) {
  return Database.updateOne(
    { Message_id: messageid },
    {
      $push: {
        "Users.yes": userid
      }
    }
  );
}
