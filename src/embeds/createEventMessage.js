import Discord from "discord.js";

export default function createEventMessage(title, time, client, id) {
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
}
