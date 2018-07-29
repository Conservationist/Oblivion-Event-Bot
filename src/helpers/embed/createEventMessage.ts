import { RichEmbed, Client } from "discord.js";

function createEventMessage(
  title: string,
  time: string,
  client: Client,
  id: string
): object {
  const embed: RichEmbed = new RichEmbed()
    .setColor(`#fda831`)
    .setAuthor(`📆 ${title}`)
    .addField(`🕐 Time`, time, true)
    .addField(`🆔 ID`, id, true)
    .setDescription(`Limited to 30 people.`)
    .setFooter(
      `Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.`,
      client.user.avatarURL
    );
  return embed;
}
