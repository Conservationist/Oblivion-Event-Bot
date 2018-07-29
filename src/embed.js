import Database from "./modal";
export async function BotReplyEmbed(
  title,
  description,
  color,
  client,
  message
) {
  const botsettings = await Database.find();
  const embed = {
    title: title,
    description: description,
    color: color,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    }
  };
  if (botsettings.length < 1)
    return message
      .reply({ embed })
      .catch(e => console.log(e))
      .then(msg => {
        msg.delete(10000);
      });
  const channelid = botsettings[0];
  return client.channels
    .get(channelid.botChannel)
    .send({ embed })
    .catch(e => console.log(e))
    .then(msg => {
      console.log("SENT EMBED.");
    });
}
export const colors = {
  xp: 1590722,
  general: 12720282,
  twitch: 7280834,
  admin: 16711729
};
