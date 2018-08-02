import Settings from "../models/settingsModel";
import permCheck from "./permCheck";
import Helpers from "./helpers";

export default async function setEventChannel(message, client, args) {
    if (permCheck(message, "staff") === false) {
        const embed = await Helpers.errorEmbed("Insufficient permission.");
        return message.channel.send(embed);
    }
    const guildsettings = await Settings.find();
    if (args.length === 0) {
        const embed = await Helpers.errorEmbed(
            "Invalid arguments, please check '>help'."
        );
        return message.channel.send(embed);
    }
    const channel = client.channels.find("name", args[0]);
    if (!channel) {
        const embed = await Helpers.errorEmbed("Channel does not exist.");
        return message.channel.send(embed);
    }
    if (!guildsettings[0]) {
        const eventChannel = new Settings({ listChannel: channel.id });
        eventChannel.save(async (err, channel) => {
            if (err) return console.error(err);
            console.log(channel.id + " saved to collection.");
        });
        const embed = await Helpers.successEmbed(
            `The >list command will now be allowed in the channel "${args[0]}".`
        );
        return message.channel.send(embed);
    }
    if (guildsettings[0].eventChannel) {
        Settings.updateOne(
            { _id: guildsettings[0]._id },
            { $set: { listChannel: channel.id } },
            async (err, res) => {
                if (!err) {
                    const embed = await Helpers.successEmbed(
                        `The >list command will now be allowed in the channel "${args[0]}".`
                    );
                    return message.channel.send(embed);
                } else if (err) return console.log(err);
            }
        );
    }
}
