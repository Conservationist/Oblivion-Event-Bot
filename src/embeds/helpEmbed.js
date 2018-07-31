export default function returnHelpEmbed(client) {
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
}
