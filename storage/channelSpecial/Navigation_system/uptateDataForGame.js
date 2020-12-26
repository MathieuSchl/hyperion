const config = require('../../config.json');
const fs = require("fs");
const System = "Navigation_system";

module.exports.run = async (bot, message, teamData) => {
    if(teamData.data[System]["shipsCoordinates"]==null){
        teamData.data[System]["shipsCoordinates"]=false;
        teamData.data[System]["earthCoordinate"]=false;
        teamData.data[System]["scnanner"]=false;
        teamData.data[System]["nbScan"]=0;
        await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    }

    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};