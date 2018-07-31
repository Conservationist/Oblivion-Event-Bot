export default function successEmbed() {
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
