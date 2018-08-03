import { permCheck } from "../helpers";
import * as Embeds from "../embeds"
import logger from "../logger";
// import permCheck from "../helpers/permCheck";

export default async function cleanChannel(message, args) {
  if (permCheck(message, "staff") === false) {
    const embed = await Embeds.errorEmbed(
      "You do not have the required permission to do this."
    );
    return message.channel.send(embed);
  }
  if (!args) {
    logger.info(`Invalid arguments specified by user ${message.author.username}:${message.author.id}.`)
    const embed = await Embeds.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  let numberOfMessages = [args];
  if (isNaN(numberOfMessages) === true) {
    const embed = await Embeds.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  message.delete();
  let messages = await message.channel
    .fetchMessages({ limit: parseInt(numberOfMessages) })
    .catch(async e => {
      logger.error(`Error occured fetching messages ${e.message}`)
      const embed = await Embeds.successEmbed(
        "Failed to fetch messages to delete."
      );
      return message.channel.send(embed);
    });
  return message.channel
    .bulkDelete(messages)
    .then(async () => {
      logger.info(`Cleared ${parseInt(numberOfMessages)} messages. USER: ${message.author.id}`)
      const embed = await Embeds.successEmbed(
        `Cleared ${parseInt(numberOfMessages)} messages.`
      );
      return message.channel.send(embed).then(m => m.delete(10000));
    })
    .catch(async err => {
      logger.error(`Error occured deleting messages ${err.message}`)
      const embed = await Embeds.errorEmbed(err.message);
      return message.channel.send(embed);
    });
}
