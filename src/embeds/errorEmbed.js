import Discord from "discord.js";

export default function errorEmbed(message) {
  const embed = new Discord.RichEmbed()
    .setColor("#FF0033")
    .setAuthor(`🚫 Error`)
    .setDescription(message)
    .setFooter(
      "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
      "https://cdn.discordapp.com/avatars/469204371289145345/561ea91258cf5ccad4685a1b4f52355e.png?size=2048"
    );
  return embed;
}
