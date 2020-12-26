const config = require('../config.json');
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

module.exports.run = async (bot, idChannel) => {
    const message = (await bot.channels.fetch(idChannel)).messages.cache.array().reverse()[0];
    bot.specialChannel.theEnd.get("index").run(bot, message, null);
}

module.exports.help = {
    name: "theGameIsFinished"
};