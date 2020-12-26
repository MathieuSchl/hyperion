const config = require("../../config.json");
const fs = require("fs");
const pathGlobaleData = config.location + "/storage/data/GlobaleData.json";
const path = config.location + "/storage/data/specialChannelList/";
const pathMessage = config.location + "/storage/data/specialMessageList/";




module.exports.run = async (bot, gameId) => {
    let teamData = await bot.basicFunctions.get("teamData").open(gameId);
    await bot.basicFunctions.get("wait").run(1000);

    const gameChannel = await bot.channels.fetch(teamData.id);


    //delete all channels
    const channelsToDelete = [teamData.vocal, teamData.chat, teamData.leaveGame, teamData.invitePlayer, teamData.removePlayer, teamData.id, teamData.category];

    for (let index = 0; index < channelsToDelete.length; index++) {
        const element = channelsToDelete[index];
        try {
            const vocalChannel = await bot.channels.fetch(element);
            vocalChannel.delete();

            // delete channel file
            try {
                fs.unlinkSync(path + (element) + ".json")
            } catch (e) {}

        } catch (e) {}
        await bot.basicFunctions.get("wait").run(2500);
    }

    //delete Message File
    try{
        fs.unlinkSync(pathMessage + (teamData.leaveMessage) + ".json")
    }catch(e){}




    //delete role
    try {
        const teamRole = await gameChannel.guild.roles.fetch(teamData.role);
        teamRole.delete();
    } catch (e) {}

    //delete role in roleList
    try {
        fichiers = fs.readFileSync(pathGlobaleData);
        data = JSON.parse(fichiers);

        data.roleList[gameChannel.guild.id].splice(data.roleList[gameChannel.guild.id].indexOf(teamData.role), 1);

        let donnees = JSON.stringify(data);
        fs.writeFileSync(pathGlobaleData, donnees);
    } catch (e) {
        console.log(e)
    }
}

module.exports.help = {
    name: "removeGame"
};