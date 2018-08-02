import uniqid from "uniqid";
import Settings from "../models/settingsModel";
import * as Embeds from "../embeds/";
import { createTimeString, addMessageId, createEvent, permCheck } from "../helpers"
import logger from "../logger"
/* ARGS: title, date, time,  */
/* emojis in it 📆 */
/* 18-07-17 */
export default async function addEvent(m, client, args) {
  if (permCheck(m, "staff") === false) {
    logger.info(`User ${m.author.username}:${m.author.id} tried to access staff commands without perms.`)
    const embed = await Embeds.errorEmbed("Insufficient permission.");
    return m.channel.send(embed);
  }
  if (!args || args.length < 1) {
    logger.info(`Invalid arguments specified by user ${m.author.username}:${m.author.id}.`)
    const embed = await Embeds.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return m.channel.send(embed);
  }
  const eventchannel = await Settings.find();
  if (eventchannel.length < 1 || !eventchannel) {
    const embed = await Embeds.errorEmbed(
      "List channel not set, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const time = args.pop();
  const title = args.join(" ");
  const event_time = createTimeString(time);
  const id = uniqid();
  const embed = Embeds.createEventMessage(title, event_time, client, id);
  const react_channel = await client.channels.find(
    "id",
    eventchannel[0].eventChannel
  );
  createEvent(title, event_time, id, m);
  return react_channel.send(embed).then(async m =>
    m.react("✅").then(() => m.react("❌").then(() => addMessageId(m.id, id))))
}
