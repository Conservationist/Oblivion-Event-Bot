import Discord from "discord.js";

export default function successEmbed(message) {
  const embed = new Discord.RichEmbed()
    .setColor("#d0ef84")
    .setAuthor(`⭕ Success`)
    .setDescription(message)
    .setFooter(
      "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
      "https://cdn.discordapp.com/avatars/469204371289145345/561ea91258cf5ccad4685a1b4f52355e.png?size=2048"
    );
  console.log("how many times am i being called")
  return embed;
}
