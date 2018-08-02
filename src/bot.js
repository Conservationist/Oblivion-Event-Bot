import Discord from "discord.js";
import mongoose from "mongoose";
import { addEvent, list } from "./commands"
import dotenv from "dotenv";
import { userReactHandler } from "./helpers/"
import logger from "./logger/"
dotenv.config();

/* connect to the DB */
const mongo_options = {
  useNewUrlParser: true,
  reconnectInterval: 500,
  autoReconnect: true
};
logger.info('Attempting to connect to db...');
mongoose.connect(
  "mongodb://127.0.0.1:27017/Oblivion",
  mongo_options
).then(m => logger.info("Connected to db successfully.")).catch(e => logger.error('failed to connect to db, attempting to reconnect...'));

/* create a new discord client */
const client = new Discord.Client();
/* check if bot is ready, when is ready, set activity and notify that bot has started */
client.on("ready", () => {
  logger.info("Client is ready...");
  client.user.setActivity(`Boosting for ${client.users.size} people ;)`);
});

const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};

client.on("error", (error) => {
  logger.error("Client recieved error.")
});

client.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;
  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel =
    client.channels.get(data.channel_id) || (await user.createDM());

  if (channel.messages.has(data.message_id)) return;

  const message = await channel.fetchMessage(data.message_id);

  const emojiKey = data.emoji.id
    ? `${data.emoji.name}:${data.emoji.id}`
    : data.emoji.name;
  // ...
  let reaction = message.reactions.get(emojiKey);
  if (!reaction) {
    // Create an object that can be passed through the event like normal
    const emoji = new Discord.Emoji(
      client.guilds.get(data.guild_id),
      data.emoji
    );
    reaction = new Discord.MessageReaction(
      message,
      emoji,
      1,
      data.user_id === client.user.id
    );
  }
  client.emit(events[event.t], reaction, user);
});
client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.emoji.name === "✅") {
    return userReactHandler(user.id, reaction.message.id, "yes");
  }
  if (reaction.emoji.name === "❌") {
    return userReactHandler(user.id, reaction.message.id, "no");
  }
});
/* set a prefix */
const prefix = ">";
/* handling when people send messages. */
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  // if (command === "setbotchannel") {
  //   return setBotChannel(message, client, args);
  // }
  if (command === "addevent") {
    return addEvent(message, client, args);
  }
  if (command === "list") {
    return list(message, args, client);
  }
  if (command === "dropdb") {
    if (message.author.id !== "198635124244480012") return;
    return mongoose.connection.collections["Events"].drop(function (err) {
      message.reply("DB Dropped");
      logger.info(`DB has been dropped by user ${message.author.username}:${message.author.id}.`)
    });
  }
  // if (command === "help") {
  //   return message.channel.send(Helpers.returnHelpEmbed(client));
  // }
  // if (command === "clean") {
  //   return cleanChannel(message, args);
  // }
  // if (command === "botinfo") {
  //   return botInfo(message, client);
  // }
  // if (command === "seteventchannel") {
  //   return setEventChannel(message, client, args);
  // }
  // if (command === "setlistchannel") {
  //   return setListChannel(message, client, args);
  // }
});

/* login handler */

if (process.env.NODE_ENV !== "production") {
  client.login(process.env.BOT_DEV).then(logger.info("Client started successfully.")).catch(logger.error("Client failed to connect..."))
} else {
  client.login(process.env.BOT_LIVE).then(logger.info("Client started successfully.")).catch(logger.error("Client failed to connect..."))
}
