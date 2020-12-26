const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message, teamData) => {
    
    teamData.type = "oxygen_system";
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    bot.specialChannel.oxygen_system.get("index").run(bot, message);
}

module.exports.help = {
    name: "unloked"
};