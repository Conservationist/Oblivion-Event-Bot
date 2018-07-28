import Discord, { Guild } from "discord.js";
import mongoose from "mongoose";
import Database from "./modal.js";
import { BotReplyEmbed, colors } from "./embed";
import setEventChannel from "./commands/setEventChannel";
import setListChannel from "./commands/setListChannel";
import addEvent from "./commands/addEvent";
import Helpers from "./commands/helpers";
import ListUsers from "./commands/list";
import uniqid from "uniqid";
import dotenv from "dotenv";
import cleanChannel from "./commands/cleanChannel";
import botInfo from "./commands/botinfo";
dotenv.config();
/* connect to the DB */
const mongo_options = {
  useNewUrlParser: true,
  reconnectInterval: 500,
  autoReconnect: true
};
mongoose.connect(
  "mongodb://127.0.0.1:27017/Oblivion",
  mongo_options
);

/* create a new discord client */
const client = new Discord.Client();

/* check if bot is ready, when is ready, set activity and notify that bot has started */
client.on("ready", () => {
  console.log("Started successfully!");
  client.user.setActivity(`Boosting for ${client.users.size} people ;)`);
});

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.emoji.name === "✅") {
    Helpers.checkIfUserHasReacted(user.id, reaction.message.id, "yes");
  }
  if (reaction.emoji.name === "❌") {
    Helpers.checkIfUserHasReacted(user.id, reaction.message.id, "no");
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
  if (command === "setbotchannel") {
    return setBotChannel(message, client, args);
  }
  if (command === "addevent") {
    return addEvent(message, client, args);
  }
  if (command === "list") {
    return ListUsers(message, args, client);
  }
  if (command === "dropdb") {
    if (message.author.id !== "198635124244480012") return;
    return mongoose.connection.collections["Events"].drop(function(err) {
      message.reply("DB Dropped");
    });
  }
  if (command === "help") {
    console.log("hi");
    return message.channel.send(Helpers.returnHelpEmbed(client));
  }
  if (command === "debugarrayadd") {
    if (message.author.id !== "198635124244480012") return;
    for (var i = 0; i < 30; i++) {
      return Helpers.addYesUserToEventDebug("198635124244480012", args[0]);
    }
  }
  if (command === "clean") {
    return cleanChannel(message, args);
  }
  if (command === "botinfo") {
    return botInfo(message, client);
  }
  if (command === "seteventchannel") {
    return setEventChannel(message, client, args);
  }
  if (command === "setlistchannel") {
    return setListChannel(message, client, args);
  }
});
/* login =) */
client.login(process.env.BOT_DEV);
