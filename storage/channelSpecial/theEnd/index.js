const config = require('../../config.json');
const fs = require("fs");
const System = "theEnd";

module.exports.run = async (bot, message, args) => {
    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    if(args==null){
        for (let index = 0; index < teamData.players.length; index++) {
            const element = teamData.players[index];
            const player = await message.guild.members.fetch(element)

            const roles = player.roles.cache.array()

            let hasNotTheRole
            for (let jindex = 0; jindex < roles.length; jindex++) {
                const element = roles[jindex];
                console.log(element.id);
            }

        }
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