const config = require("../config.json");
const fs = require("fs");
const guildId = "786341813530656828";
const intervalFromChange = 60000;
let indexMess = 0;


async function getMessage(bot) {
    let mess = "";
    let type = "";

    //WATCHING PLAYING
    const guilds = await bot.guilds.fetch(guildId);
    
    fichiers = fs.readFileSync(config.location + "/storage/data/GlobaleData.json");
    let globalData = JSON.parse(fichiers);

    switch (indexMess) {
        case 0:
            const members = await guilds.members.cache.array();
            mess = "pour " + members.length + " joueurs";
            type = "PLAYING";
            break;
        case 1:
            const channels = await guilds.channels.cache.array();
            mess = "" + channels.length + " channels dans le serveur";
            type = "WATCHING";
            break;
        case 2:
            mess = "" + globalData.gameFinised + " parties terminés";
            type = "WATCHING";
            break;
        case 3:
            mess = "meilleur temps : " + globalData.bestTime + "";
            type = "WATCHING";
            break;
        default:
            indexMess = 0;
            return await getMessage(bot);
    }

    indexMess++;
    return [type, mess];
}

async function changeActivity(bot){
    const res = await getMessage(bot);
    bot.user.setActivity(res[1], {
        type: res[0]
    }).catch((e)=>{
    });
} 

module.exports.run = async (bot) => {
    changeActivity(bot);
    bot.setInterval(async function () {
        changeActivity(bot);
    }, intervalFromChange);
}

module.exports.help = {
    name: "activity"
};