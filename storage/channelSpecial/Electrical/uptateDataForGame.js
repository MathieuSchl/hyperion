const config = require('../../config.json');
const fs = require("fs");
const system = "Electrical";

module.exports.run = async (bot, message, teamData) => {
    if(teamData.data[system]["userId"]==null){
        teamData.data[system]["userId"]="";
        teamData.data[system]["systemActive"]="menu";
        teamData.data[system]["reactor"]=false;
        teamData.data[system]["navigation"]=true;
        teamData.data[system]["oxygen"]=false;

        await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    }
    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};