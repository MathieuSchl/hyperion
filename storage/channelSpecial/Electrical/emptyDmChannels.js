const config = require("../../config.json");
const fs = require("fs");
const path = config.location + "storage/data/DmChannel.json";


module.exports.run = async (bot, teamData) => {
    fichiers = fs.readFileSync(path);
    let dataDmChannel = JSON.parse(fichiers);

    let players = teamData.players;
    let parent = (await bot.channels.fetch(dataDmChannel[players[0]])).parentID;
    for (let i = 0; i < players.length; i++) {
        let channel = await bot.channels.fetch(dataDmChannel[players[i]]);
        delete dataDmChannel[players[i]];
        channel.delete();
        await bot.basicFunctions.get("wait").run(250);
    }
    let donnees = JSON.stringify(dataDmChannel);
    fs.writeFileSync(path, donnees);

    await bot.basicFunctions.get("wait").run(250);
    parent = await bot.channels.fetch(parent);
    let children = Array.from(parent.children);
    if (children.length === 0) parent.delete();
    return;
}

module.exports.help = {
    name: "emptyDmChannels"
};