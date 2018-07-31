import Helpers from "./helpers";
import uniqid from "uniqid";
import permCheck from "./permCheck";
import Settings from "../settingsmodal";
/* ARGS: title, date, time,  */
/* emojis in it 📆 */
/* 18-07-17 */
export default async function addEvent(m, client, args) {
  if (permCheck(m, "staff") === false) {
    const embed = await Helpers.errorEmbed("Insufficient permission.");
    return m.channel.send(embed);
  }
  if (!args || args.length < 1) {
    const embed = await Helpers.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return m.channel.send(embed);
  }
  const eventchannel = await Settings.find();
  if (eventchannel.length < 1 || !eventchannel) {
    const embed = await Helpers.errorEmbed(
      "List channel not set, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const time = args.pop();
  const title = args.join(" ");
  const event_time = Helpers.createTimeString(time);
  const id = uniqid();
  const embed = Helpers.createEventMessage(title, event_time, client, id);
  const react_channel = await client.channels.find(
    "id",
    eventchannel[0].eventChannel
  );
  Helpers.createEvent(title, event_time, id, m);
  return react_channel.send(embed).then(async m => {
    m.react("✅");
    await Helpers.sleep(300);
    m.react("❌");
    return Helpers.addMessageId(m.id, id);
  });
}
