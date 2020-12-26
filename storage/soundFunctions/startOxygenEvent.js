const config = require('../config.json');
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

module.exports.run = async (bot,idChannel) => {
    let teamData = await bot.basicFunctions.get("teamData").open(idChannel);
    teamData.data.game_event.oxygen = true;
    await bot.basicFunctions.get("teamData").write(idChannel,teamData);
}

module.exports.help = {
    name: "startOxygenEvent"
};