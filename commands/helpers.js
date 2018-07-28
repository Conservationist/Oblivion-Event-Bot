import Database from "../modal";
import Discord from "discord.js";
import date from "date-and-time";

/* REMEMBER TO FIX NO */

/* change this if the bot is changed. */
const bot_id = "469204371289145345";
const bot_avatar =
  "https://cdn.discordapp.com/avatars/469204371289145345/561ea91258cf5ccad4685a1b4f52355e.png?size=2048";

const Helpers = {
  /* does what is says basically. */
  createEvent: (title, time, id, m) => {
    /* create a new event object*/
    const db_event = new Database({
      Title: title,
      Time: time,
      Id: id
    });
    /* save it to the DB, log any errors, notify when done + id */
    return db_event.save((err, channel) => {
      if (err) {
        console.error(err);
        return false;
      }
      console.log(`EVENT ${id} SAVED TO DB`);
      return m.channel.send("Created event with id of " + id + " sucessfully.");
    });
  },
  /* creates the message people react to */
  createEventMessage: (title, time, client, id) => {
    const embed = new Discord.RichEmbed()
      .setColor("#fda831")
      .setAuthor(`📆 ${title}`)
      .addField("🕐 Time", time, true)
      .addField("🆔 ID", id, true)
      .setDescription("Limited to 30 people.")
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        client.user.avatarURL
      );
    return embed;
  },
  /* assumes that the time is always related to the current day */
  createTimeString: time => {
    const curr_date = new Date().toDateString();
    const time_date = new Date(curr_date + " " + time);
    return date.format(time_date, "MMM DD HH:mm [CET]");
  },
  /* when a user reacts with right emoji, we add their id to the DB */
  addYesUserToEvent: async (userid, messageid) => {
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* check if event exists or not */
    if (event.length < 1 || !event) return false;
    /* see if the user is already in the db, so people don't keep reacting. */
    if (event[0].Users.yes.includes(userid) === true) return;
    /* limit to 30 people */
    if (event[0].Users.yes.length === 30) return;
    /* send the update req */
    return Database.updateOne(
      { _id: event[0]._id },
      {
        $push: {
          "Users.yes": userid
        }
      }
    );
  },
  addYesUserToEventDebug: async (userid, messageid) => {
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* check if event exists or not */
    if (event.length < 1 || !event) return false;
    /* see if the user is already in the db, so people don't keep reacting. */
    if (event[0].Users.yes.includes(userid) === true) return;
    /* limit to 30 people */
    console.log(event[0].Users.yes.length);
    if (event[0].Users.yes.length === 30) return;
    /* send the update req */
    return Database.updateOne(
      { _id: event[0]._id },
      {
        $push: {
          "Users.yes": userid
        }
      },
      err => {
        console.log(`added: ${userid} to ${messageid}`);
        if (err) return console.log(err);
      }
    );
  },
  addNoUserToEvent: async (userid, messageid) => {
    console.log("hi");
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* check if event exists or not */
    if (event.length < 1 || !event) return false;
    /* see if the user is already in the db, so people don't keep reacting. */
    if (event[0].Users.no.includes(userid) === true) return;
    /* send the update req */
    return Database.updateOne(
      { _id: event[0]._id },
      {
        $push: {
          "Users.no": userid
        }
      }
    );
  },
  /* checks to see if the message is in the db, if not return false if is return true. */
  checkEventMessageIds: async messageid => {
    const event = await Database.find({ Message_id: messageid });
    if (event.length < 1 || !event) return false;
    return true;
  },
  addMessageId: async (messageid, eventid) => {
    const event = await Database.find({ Id: eventid });
    if (event.length < 1 || !event) return;
    if (!messageid) return false;
    return Database.updateOne(
      { _id: event[0]._id },
      { $set: { Message_id: messageid } }
    );
  },
  /* when a user reacts with right emoji, we add their id to the DB */
  removeYesUserFromEvent: async (userid, messageid) => {
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* see if the event exists */
    if (event.length < 1 || !event) return;
    /* check to see if the user already exists */
    if (event[0].Users.no.includes(userid) === true) return;
    /* if it doesnt we map all users and find the users */
    return event[0].Users.yes.map(user => {
      if (user === userid) {
        /* when we find the user we remove the user from the yes array, and add it to x array */
        return Database.updateOne(
          { _id: event[0]._id },
          {
            $pull: { "Users.yes": userid },
            $push: {
              "Users.no": userid
            }
          },
          err => {
            if (err) return console.log(err);
          }
        );
      }
    });
  },
  removeNoUserFromEvent: async (userid, messageid) => {
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* see if the event exists */
    if (event.length < 1 || !event) return false;
    /* check to see if the user already exists */
    if (event[0].Users.yes.includes(userid) === true) return;
    if (event[0].Users.yes.length === 30) return;
    /* if it doesnt we map all users and find the users */
    return event[0].Users.no.map(user => {
      if (user === userid) {
        /* when we find the user we remove the user from the yes array, and add it to x array */
        return Database.updateOne(
          { _id: event[0]._id },
          {
            $pull: { "Users.no": userid },
            $push: {
              "Users.yes": userid
            }
          },
          err => {
            if (err) return console.log(err);
          }
        );
      }
    });
  },
  /* checks if the event exists or not */
  checkIfValidId: async eventid => {
    const event = await Database.find({ Id: eventid });
    if (event.length < 1 || !event) return false;
    else return true;
  },
  /* gets all users is the yes array and returns them with the event id */
  returnEventYesList: async eventid => {
    const event = await Database.find({ Id: eventid });
    if (event.length < 1 || !event) return;
    if (event[0].Users.yes.length === 0) return { err: true };
    return {
      id: eventid,
      usersArr: event[0].Users.yes,
      title: event[0].Title,
      err: false
    };
  },
  /* gets all users is the no array and returns them with the event id */
  returnEventNoList: async eventid => {
    const event = await Database.find({ Id: eventid });
    if (event.length < 1 || !event) return;
    if (event[0].Users.no.length === 0) return { err: true };
    return {
      id: eventid,
      usersArr: event[0].Users.no,
      title: event[0].Title,
      err: false
    };
  },
  /* creates the help embed */
  returnHelpEmbed: client => {
    const embed = new Discord.RichEmbed()
      .setColor("#d0ef84")
      .setAuthor(`🤖 Help Menu`)
      .addField("Add Event (staff) 📆", ">addevent `title` `time`")
      .addField("List users who reacted with ✅", ">list `eventid` `yes`")
      .addField("List users who reacted with ❌", ">list `eventid` `no`")
      .addField(
        "Clean (staff) 🌪",
        ">clean `number of messages to clean` (only use in the channel you want to delete messages!, will delete amount of messages passed, max 100)"
      )
      .addField(
        "Set event channel (staff) 🔧",
        ">seteventchannel `channelname` (This is where events will be sent.)"
      )
      .addField(
        "Set list channel (staff) 🔧",
        ">seteventchannel `channelname` (This is where the list command will be allowed.)"
      )
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        client.user.avatarURL
      );
    return embed;
  },
  /* creates the yes embed */
  returnYesEmbed: async function(yeslist, client) {
    /* we map through all the users outputting them numerically  */
    if (yeslist.err === true)
      return this.errorEmbed("List is currently empty.");
    if (!yeslist.id) return this.errorEmbed("Event does not exist");
    const embed = new Discord.RichEmbed()
      .setAuthor(`✅ ${yeslist.title} (${yeslist.id})`)
      .setColor("#f4d143")
      .setDescription(
        yeslist.usersArr.map((m, index) => `${index + 1}. <@${m}> \n`)
      )
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        bot_avatar
      );
    return embed;
  },

  /* creates the no embed */
  returnNoEmbed: async function(yeslist, client) {
    /* we map through all the users outputting them numerically  */
    if (yeslist.err === true)
      return this.errorEmbed("List is currently empty.");
    if (!yeslist.id) return this.errorEmbed("Event does not exist");
    const embed = new Discord.RichEmbed()
      .setAuthor(`❌ ${yeslist.title} yeslist.id`)
      .setColor("#de561c")
      .setDescription(
        yeslist.usersArr.map((m, index) => `${index + 1}. <@${m}> \n`)
      )
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        bot_avatar
      );
    return embed;
  },
  checkIfUserHasReacted: async function(userid, messageid, type) {
    /* find the event via messsage id */
    const event = await Database.find({ Message_id: messageid });
    /* check if event exists or not */
    if (event.length < 1 || !event) return;
    /* ignore the bot ;) */
    if (userid === bot_id) return;
    if (userid === "123796658516525056") return;
    /* see if the user is already in the db, so people don't keep reacting. */
    if (type === "no") {
      if (
        event[0].Users.no.includes(userid) === false &&
        event[0].Users.yes.includes(userid) === true
      )
        return this.removeYesUserFromEvent(userid, messageid);
      if (event[0].Users.no.includes(userid) === false)
        return this.addNoUserToEvent(userid, messageid);
    }
    if (type === "yes") {
      if (
        event[0].Users.no.includes(userid) === true &&
        event[0].Users.yes.includes(userid) === false
      )
        return this.removeNoUserFromEvent(userid, messageid);
      if (event[0].Users.yes.includes(userid) === false)
        return this.addYesUserToEvent(userid, messageid);
    }
  },
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  errorEmbed: message => {
    const embed = new Discord.RichEmbed()
      .setColor("#FF0033")
      .setAuthor(`🚫 Error`)
      .setDescription(message)
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        bot_avatar
      );
    return embed;
  },
  successEmbed: message => {
    const embed = new Discord.RichEmbed()
      .setColor("#d0ef84")
      .setAuthor(`⭕ Success`)
      .setDescription(message)
      .setFooter(
        "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
        bot_avatar
      );
    return embed;
  }
};
export default Helpers;
