import Database from "../models/eventModel";
import logger from "../logger";
import { errorEmbed, successEmbed } from "../embeds"

export default function createEvent(title, time, id, m) {
  /* create a new event object*/
  const db_event = new Database({
    Title: title,
    Time: time,
    Id: id
  });
  /* save it to the DB, log any errors, notify when done + id */
  return db_event.save((err) => {
    if (err) {
      if (err.message) {
        logger.error(err.message)
      } else {
        logger.error(`An error occured creating event ${title}:${id}`)
      }
      const embed = errorEmbed(`An error occured creating event \`${title}:${id}.\``);
      return m.channel.send(embed);
    }
    if (!err) {
      logger.info(`Event ${title}:${id} created successfully.`)
      const embed = successEmbed("Created event " + "`" + title + ":" + id + "`" + " " + "successfully.")
      return m.channel.send(embed);
    }
  });
}
