const config = require('../../config.json');
const fs = require("fs");
const System = "Scanner";

module.exports.run = async (bot, message, teamData) => {
    teamData.endingTime=new Date();
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);

    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};