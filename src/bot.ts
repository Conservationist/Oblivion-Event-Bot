//@ts-check
import Discord, { Client } from "discord.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as createEvent from "./commands/addEvent";
// import setEventChannel from "./commands/setEventChannel";
// import setListChannel from "./commands/setListChannel";
// import addEvent from "./commands/addEvent";
// import Helpers from "./commands/helpers";
// import ListUsers from "./commands/list";
// import cleanChannel from "./commands/cleanChannel";
// import botInfo from "./commands/botinfo";

dotenv.config();
/* connect to the DB */
const mongoOptions: object = {
  useNewUrlParser: true,
  reconnectInterval: 500,
  autoReconnect: true
};
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/Oblivion",
    mongoOptions
  )
  .catch(e => console.log(e));

/* create a new discord client */
const client: Client = new Discord.Client();

/* check if bot is ready, when is ready, set activity and notify that bot has started */
client.on("ready", () => {
  console.log("Started successfully!");
  client.user.setActivity(`Boosting for ${client.users.size} people ;)`);
});

// client.on("messageReactionAdd", (reaction, user) => {
//   if (reaction.emoji.name === "✅") {
//     Helpers.checkIfUserHasReacted(user.id, reaction.message.id, "yes");
//   }
//   if (reaction.emoji.name === "❌") {
//     Helpers.checkIfUserHasReacted(user.id, reaction.message.id, "no");
//   }
// });

/* set a prefix */
const prefix: string = ">";
/* handling when people send messages. */
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args: Array<string> = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  console.log(args);
  const command: string = args.shift()!.toLowerCase();
  // if (command === "addevent") {
  //   return createEvent(message, client, args);
  // }
  // if (command === 'list') {
  //   return ListUsers(message, args, client);
  // }
  // if (command === 'dropdb') {
  //   if (message.author.id !== '198635124244480012') return;
  //   return mongoose.connection.collections.Events.drop((err) => {
  //     message.reply('DB Dropped');
  //   });
  // }
  // if (command === 'help') {
  //   console.log('hi');
  //   return message.channel.send(Helpers.returnHelpEmbed(client));
  // }
  // if (command === 'debugarrayadd') {
  //   if (message.author.id !== '198635124244480012') return;
  //   for (let i = 0; i < 30; i++) {
  //     return Helpers.addYesUserToEventDebug('198635124244480012', args[0]);
  //   }
  // }
  // if (command === 'clean') {
  //   return cleanChannel(message, args);
  // }
  // if (command === 'botinfo') {
  //   return botInfo(message, client);
  // }
  // if (command === 'seteventchannel') {
  //   return setEventChannel(message, client, args);
  // }
  // if (command === 'setlistchannel') {
  //   return setListChannel(message, client, args);
  // }
});
/* login =) */
client.login(process.env.BOT_DEV);
