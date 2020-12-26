const config = require('../config.json');
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

module.exports.run = async (bot,idChannel) => {
    let teamData = await bot.basicFunctions.get("teamData").open(idChannel);
    teamData.type = "game";
    teamData.startingTime = new Date();
    teamData.lastAction = new Date();
    const mess = "L'équipe \"" + teamData.name + "\" a commencé le " + teamData.startingTime.getDate() + "/" + teamData.startingTime.getMonth() + "/" + teamData.startingTime.getFullYear() + " à " + teamData.startingTime.getHours() + ":" + teamData.startingTime.getMinutes();
    channel = await bot.channels.fetch(teamData.chat);
    channel.send(mess);
    await bot.basicFunctions.get("teamData").write(idChannel,teamData);

    bot.specialChannel["game"].get("index").run(bot, (await (await bot.channels.fetch(teamData.id)).messages.fetch(await bot.channels.fetch(teamData.id).lastMessageID)).array()[0], null);
}

module.exports.help = {
    name: "startGameAfterIntro"
};