import { returnEventList, checkIfValidId } from "../helpers"
import * as Embeds from "../embeds"
import Settings from "../models/settingsModel";

export default async function ListUsers(message, args, client) {
  if (!args || args.length < 2) {
    const embed = await Embeds.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const listchannel = await Settings.find();
  if (listchannel.length < 1 || !listchannel) {
    const embed = await Embeds.errorEmbed(
      "List channel not set, please check '>help'."
    );
    return message.channel.send(embed);
  }
  if (message.channel.id !== listchannel[0].listChannel) {
    const embed = await Embeds.errorEmbed(
      "Command not allowed in this channel."
    );
    return message.channel.send(embed);
  }
  const [id, type] = args;
  if ((await checkIfValidId(id)) === false) {
    const embed = await Embeds.errorEmbed("Event ID is not valid.");
    return message.channel.send(embed);
  }
  if (type === "yes") {
    const users = await returnEventList(id, type);
    const embed = await Embeds.yesEmbed(users);
    return message.channel.send(embed);
  }
  if (type === "no") {
    const users = await returnEventList(id, type);
    const embed = await Embeds.noEmbed(users);
    return message.channel.send(embed);
  }
}
