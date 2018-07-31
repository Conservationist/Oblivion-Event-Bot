export default function errorEmbed() {
  const embed = new Discord.RichEmbed()
    .setColor("#FF0033")
    .setAuthor(`🚫 Error`)
    .setDescription(message)
    .setFooter(
      "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
      bot_avatar
    );
  return embed;
}
