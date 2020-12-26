const config = require('../../config.json');
const fs = require("fs");
const System = "Scanner";

module.exports.run = async (bot, message, teamData) => {
    teamData.endingTime=new Date();
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);

    for (let index = 0; index < teamData.players.length; index++) {
        const element = teamData.players[index];
        let data = await bot.basicFunctions.get("userData").open(bot,element);

        if(data.gameType==="normal"&&data.timeFirstTry==null) 

        await bot.basicFunctions.get("userData").write(element,data);
    }

    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};