const config = require('../../config.json');
const fs = require("fs");
const system = "game";

module.exports.run = async (bot, message, teamData) => {

    teamData.type = system;
    teamData.data.pwd = "/archives/";
    await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    bot.specialChannel.game.get("ls").run(bot,message,null);
}

module.exports.help = {
    name: "unloked"
};