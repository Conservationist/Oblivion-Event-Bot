import Helpers from "./helpers";
import Settings from "../settingsmodal";

export default async function ListUsers(message, args, client) {
  if (!args || args.length < 2) {
    const embed = await Helpers.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const listchannel = await Settings.find();
  if (listchannel.length < 1 || !listchannel) {
    const embed = await Helpers.errorEmbed(
      "List channel not set, please check '>help'."
    );
    return message.channel.send(embed);
  }
  if (message.channel.id !== listchannel[0].listChannel) {
    const embed = await Helpers.errorEmbed(
      "Command not allowed in this channel."
    );
    return message.channel.send(embed);
  }
  const [id, type] = args;
  if ((await Helpers.checkIfValidId(id)) === false) {
    const embed = await Helpers.errorEmbed("Event ID is not valid.");
    return message.channel.send(embed);
  }
  if (type === "yes") {
    const users = await Helpers.returnEventYesList(id);
    const embed = await Helpers.returnYesEmbed(users);
    return message.channel.send(embed);
  }
  if (type === "no") {
    const users = await Helpers.returnEventNoList(id);
    const embed = await Helpers.returnNoEmbed(users);
    return message.channel.send(embed);
  }
}
