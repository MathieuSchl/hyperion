const config = require('../config.json');
const fs = require("fs");
const path = config.location + "storage/data/specialChannelList.json";
const banList = ["table_de_decryptage", "Reactor_system", "Scanner"]

module.exports.run = async (bot, message, exe) => {
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);

    exe = exe.split(".")[0];

    if (teamData.data[exe] == null || teamData.data[exe].unlock !== true) {
        if (!banList.includes(exe)) {
            exe = exe + "_password";
        }
    }

    teamData.type = exe;

    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

    try {
        bot.specialChannel[exe].get("index").run(bot, message, null)
    } catch (e) {
        console.log("\"" + exe + "\" does not exist");
        teamData.type = "game";

        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
    }
};

module.exports.help = {
    name: "runExe"
};