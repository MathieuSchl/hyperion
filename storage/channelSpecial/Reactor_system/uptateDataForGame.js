const config = require('../../config.json');
const fs = require("fs");
const system = "Reactor_system";

module.exports.run = async (bot, message, teamData) => {
    if (teamData.data[system] == null) {
        teamData.data[system] = {};
        teamData.data[system]["userId"] = "";
        teamData.data[system]["sequence"] = [];
        teamData.data[system]["reactor"] = false;
        teamData.data[system]["sequenceMenu"] = false;

        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
    }

    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};