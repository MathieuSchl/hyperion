const config = require('../../config.json');
const fs = require("fs");
const passwordSystem = "archiveAccess_password";

module.exports.run = async (bot, message, args) => {
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    if (teamData.data[passwordSystem] == null || !teamData.data[passwordSystem].unlock) {
        if (args == null) {
            bot.specialChannel[passwordSystem].get("firstTime").run(bot, message);
            return;
        } else {
            bot.specialChannel[passwordSystem].get("checkPassword").run(bot, message, teamData);
            return;
        }
    } else {
        bot.specialChannel[passwordSystem].get("unloked").run(bot, message, teamData);
        return;
    }
}

module.exports.help = {
    name: "index"
};