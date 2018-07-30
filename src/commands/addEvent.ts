import Helpers from "./helpers";
import permCheck from "./permCheck";
import Settings from "../models/settingsModal";
import { Message, Client, RichEmbed, Channel } from "discord.js";

/**
 *  This is the event adder, not everything is handled in here, but most is.
 * @param message passed message from the on.message event in bot.js
 * @param client client from bot.js
 * @param args arguments passed in by the user
 */

export default async function addEvent(
  message: Message,
  client: Client,
  args: string[]
): Promise<object> {
  if (permCheck(message, "staff") === false) {
    const embed: RichEmbed = await Helpers.errorEmbed(
      "Insufficient permission."
    );
    return message.channel.send(embed);
  }
  if (!args || args.length < 1) {
    const embed: RichEmbed = await Helpers.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const eventChannel = await Settings.find();
  if (eventChannel.length < 1 || !eventChannel) {
    const embed: RichEmbed = await Helpers.errorEmbed(
      "List channel not set, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const time: string | undefined = args.pop();
  const title: string = args.join(" ");
  const event_time: string = Helpers.createTimeString(time);
  const embed: RichEmbed = Helpers.createEventMessage(
    title,
    event_time,
    client
  );
  const react_channel: Channel = await client.channels.find(
    "id",
    eventChannel[0].event_channel
  );
  Helpers.createEvent(title, event_time, message);
  return (react_channel as Channel)
    .send(embed)
    .then(async m => {
      (m as Message).react("✅");
      await Helpers.sleep(300);
      (m as Message).react("❌");
      return Helpers.addMessageId((m as Message).id);
    })
    .catch(e => console.log(e));
}
