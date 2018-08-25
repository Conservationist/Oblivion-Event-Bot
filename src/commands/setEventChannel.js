import Settings from "../models/settingsModel";
import * as Embeds from "../embeds";
import { permCheck } from "../helpers";
import logger from "../logger";

export default async function setEventChannel(message, client, args) {
  if (permCheck(message, "staff") === false) {
    logger.info(
      `Insufficient permission. User: ${message.author.username}:${
        message.author.id
      }.`
    );
    const embed = await Embeds.errorEmbed("Insufficient permission.");
    return message.channel.send(embed);
  }
  const guildsettings = await Settings.find();
  if (args.length === 0) {
    logger.info(
      `Invalid arguments specified by user ${message.author.username}:${
        message.author.id
      }.`
    );
    const embed = await Embeds.errorEmbed(
      "Invalid arguments, please check '>help'."
    );
    return message.channel.send(embed);
  }
  const faction = args.shift();
  if (
    faction.includes("horde") === false &&
    faction.includes("ally") === false
  ) {
    logger.info(
      `Invalid faction, specified by user ${message.author.username}:${
        message.author.id
      }.`
    );
    const embed = await Embeds.errorEmbed("Please specify a valid faction.");
    return message.channel.send(embed);
  }
  if (faction === "horde") {
    const channel = client.channels.find("id", args[0]);
    if (!channel) {
      logger.error(`Tried to fetch channel that did not exist.`);
      const embed = await Embeds.errorEmbed("Channel does not exist.");
      return message.channel.send(embed);
    }
    if (!guildsettings[0]) {
      const eventChannel = new Settings({ "eventChannel.horde": channel.id });
      eventChannel.save(async (err, channel) => {
        if (err) return console.error(err);
        logger.info(`${channel.id} saved to the collection.`);
      });
      const embed = await Embeds.successEmbed(
        `Events will now be posted in the channel "${args[0]}".`
      );
      return message.channel.send(embed);
    }
    if (guildsettings[0].eventChannel) {
      Settings.updateOne(
        { _id: guildsettings[0]._id },
        { $set: { "eventChannel.horde": channel.id } },
        async (err, res) => {
          if (!err) {
            logger.info(`${channel.id} updated to the collection.`);
            const embed = Embeds.successEmbed(
              `Events will now be posted in the channel "${args[0]}".`
            );
            return message.channel.send(embed);
          } else if (err)
            return logger.error(
              `Error occured updating the event channel collection.`
            );
        }
      );
    }
    return;
  } else if (faction === "ally") {
    const channel = client.channels.find("id", args[0]);
    if (!channel) {
      logger.error(`Tried to fetch channel that did not exist.`);
      const embed = await Embeds.errorEmbed("Channel does not exist.");
      return message.channel.send(embed);
    }
    if (!guildsettings[0]) {
      const eventChannel = new Settings({
        "eventChannel.alliance": channel.id
      });
      eventChannel.save(async (err, channel) => {
        if (err) return console.error(err);
        logger.info(`${channel.id} saved to the collection.`);
      });
      const embed = await Embeds.successEmbed(
        `Events will now be posted in the channel "${args[0]}".`
      );
      return message.channel.send(embed);
    }
    if (guildsettings[0].eventChannel) {
      Settings.updateOne(
        { _id: guildsettings[0]._id },
        { $set: { "eventChannel.alliance": channel.id } },
        async err => {
          if (!err) {
            logger.info(`${channel.id} updated to the collection.`);
            const embed = Embeds.successEmbed(
              `Events will now be posted in the channel "${args[0]}".`
            );
            return message.channel.send(embed);
          } else if (err)
            return logger.error(
              `Error occured updating the event channel collection.`
            );
        }
      );
    }
    return;
  }
}
