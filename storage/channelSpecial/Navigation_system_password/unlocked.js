const config = require('../../config.json');
const fs = require("fs");
const system = "Navigation_system";

module.exports.run = async (bot, message, teamData) => {

    teamData.type = system;
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    bot.specialChannel[system].get("index").run(bot, message);
}

module.exports.help = {
    name: "unloked"
};