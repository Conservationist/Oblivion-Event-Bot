import Discord from "discord.js";

export default function announceEmbed(title, id) {
    const embed = new Discord.RichEmbed()
        .setColor("#d0ef84")
        .setAuthor(`📆 New event listed.`)
        .setDescription(`New event **${title}**(\`${id}\`) has been listed, go sign-up!`)
        .setFooter(
            "Relative of the Billy Herrington bot. | Made by 𝓗𝓮𝔁.",
            "https://cdn.discordapp.com/avatars/469204371289145345/561ea91258cf5ccad4685a1b4f52355e.png?size=2048"
        );
    return embed;
}
