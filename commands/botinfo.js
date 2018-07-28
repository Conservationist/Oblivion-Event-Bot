import Discord from "discord.js";
export default async function BotInfo(message, client) {
  const date = new Date(client.user.createdAt);
  const embed = new Discord.RichEmbed()
    .setColor("#d0ef84")
    .setAuthor(`🤖 Bot Info`)
    .addField("Version", "Oblivion Bot v 0.1.2", true)
    .addField("Creation date", date.toDateString(), true)
    .addField("Status", client.user.presence.status, true)
    .setFooter(
      "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
      client.user.avatarURL
    );
  return message.channel.send(embed);
}
