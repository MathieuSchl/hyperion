const config = require('../../config.json');
const fs = require("fs");
const system = "Reactor_system";


module.exports.run = async (bot, message, args) => {
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    if (args == null) {
        bot.basicFunctions.get("deleteAll").run(bot, message.channel);
        bot.basicFunctions.get("wait").run(100);
        bot.basicFunctions.get("backButton").run(message);
        teamData = await bot.specialChannel[system].get("uptateDataForGame").run(bot, message, teamData);

        if (teamData.data[system]["sequenceMenu"]) {
            bot.specialChannel[system].get("sequenceMenu").run(bot, message, teamData);
            return;
        }
        bot.specialChannel[system].get("menu").run(bot, message, teamData);
        return;
    }

    bot.specialChannel[system].get("action").run(bot, message, teamData);
}

module.exports.help = {
    name: "index"
};