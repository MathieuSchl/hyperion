const config = require('../../config.json');
const fs = require("fs");
const path = config.location + "storage/data/specialChannelList.json";


module.exports.run = async (bot, message, args) => {
    
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    teamData.data.pwd = "/";
    teamData.lastAction = new Date();
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);

    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.game.get("ls").run(bot, message, args);
};

module.exports.help = {
    name: "reset"
};