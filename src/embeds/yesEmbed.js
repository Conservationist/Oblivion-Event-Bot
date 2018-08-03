import Discord from "discord.js";

export default function returnYesEmbed(yeslist) {
  /* we map through all the users outputting them numerically  */
  if (yeslist.err === true) return this.errorEmbed("List is currently empty.");
  if (!yeslist.id) return this.errorEmbed("Event does not exist");
  const embed = new Discord.RichEmbed()
    .setAuthor(`✅ ${yeslist.title} (${yeslist.id})`)
    .setColor("#f4d143")
    .setDescription(
      yeslist.usersArr.map((m, index) => `${index + 1}. <@${m}> \n`)
    )
    .setFooter(
      "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
      "https://cdn.discordapp.com/avatars/469204371289145345/561ea91258cf5ccad4685a1b4f52355e.png?size=2048"
    );
  return embed;
}
