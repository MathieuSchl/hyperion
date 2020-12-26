const config = require('../../config.json');
const fs = require("fs");
const System = "theEnd";

module.exports.run = async (bot, message, args) => {
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    if(args==null){
        bot.basicFunctions.get("deleteAll").run(bot,message.channel);
        //bot.basicFunctions.get("wait").run(100);
        bot.specialChannel[System].get("menu").run(bot, message, teamData);
        return;
    }
    
    message.delete();
}

module.exports.help = {
    name: "index"
};