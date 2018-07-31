export default function returnYesEmbed(yeslist, client) {
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
      bot_avatar
    );
  return embed;
}
