const config = require('../../config.json');
const fs = require("fs");
const pathGlobaleData = config.location + "/storage/data/GlobaleData.json";
const path = config.location + "/storage/data/specialChannelList/";
const System = "startMenu";

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (args==null || args[0] !== "delete") {
        await bot.basicFunctions.get("deleteAll").run(bot, message.channel);
        bot.specialChannel[System].get("menu").run(bot, message.channel.id);
        return
    }

    //bot.specialChannel.createGame.get("removeGame").run(bot, message.channel.id)
}

module.exports.startGame = async (bot, reaction) => {
}

module.exports.getMenu = async (bot, idChannel) => {
    const channel = await bot.channels.fetch(idChannel);

    await bot.basicFunctions.get("deleteAll").run(bot, channel);
    bot.specialChannel[System].get("menu").run(bot, channel.id);
}

module.exports.help = {
    name: "index"
};