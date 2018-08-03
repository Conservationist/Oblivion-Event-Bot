import Discord from "discord.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userReactHandler } from "./helpers/"
import logger from "./logger/"
import * as commands from "./commands";
import { helpEmbed } from "./embeds";
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
  setInterval(() => {
    client.user.setActivity(`Boosting for ${client.users.size} people ;)`);
  }, 150000)
});

const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};

client.on("error", (error) => {
  logger.error(`Client recieved error: ${error.name}, ${error.message}`)
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
  if (command === "addevent") {
    commands.addEvent(message, client, args);
  }
  if (command === "list") {
    commands.list(message, args, client);
  }
  if (command === "dropdb") {
    if (message.author.id !== "198635124244480012") return;
    return mongoose.connection.collections["Events"].drop(function (err) {
      message.reply("DB Dropped");
      logger.info(`DB has been dropped by user ${message.author.username}:${message.author.id}.`)
    });
  }
  if (command === "help") {
    message.channel.send(helpEmbed(client));
  }
  if (command === "clean") {
    commands.cleanChannel(message, args);
  }
  if (command === "botinfo") {
    commands.botInfo(message, client);
  }
  if (command === "seteventchannel") {
    commands.setEventChannel(message, client, args);
  }
  if (command === "setlistchannel") {
    commands.setListChannel(message, client, args);
  }
  if (command === "setannouncechannel") {
    commands.setAnnounceChannel(message, client, args);
  }
  if (command === "test") {
    message.channel.send("<:474931845645991938:>");
  }
});

/* login handler */
function clientLogin() {
  if (process.env.NODE_ENV !== "production") {
    return client.login(process.env.BOT_DEV)
  } else {
    return client.login(process.env.BOT_LIVE)
  }
}
clientLogin();