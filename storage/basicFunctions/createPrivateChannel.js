const config = require("../config.json");
const fs = require("fs");
const categoryMPName = "Escape game - MessagePrivé";
const path = config.location + "storage/data/DmChannel.json";


async function getEveryoneId(bot, guildId) {
    let roles = Array.from(await bot.guilds.cache.get(guildId).roles.cache);
    for (let i = 0; i < roles.length; i++) {
        if (roles[i][1].name === "@everyone") {
            return roles[i][1].id;
        }
    }
    return null;
}

module.exports.run = async (bot, guild, guildMember) => {
    //Create or find category
    let mpCategory = null;
    let channels = Array.from(guild.channels.cache);
    for (let i = 0; i < channels.length; i++) {
        if (channels[i][1].type === "category") {
            if (channels[i][1].name === categoryMPName) {
                mpCategory = channels[i][1];
            }
        }
    }

    if (mpCategory == null) {
        let options = {
            type: "category",
            permissionOverwrites: [{
                id: await getEveryoneId(bot, guild.id),
                deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES'],
            }, ],
        };
        mpCategory = await guild.channels.create(categoryMPName, options).then(guild => {
            return guild;
        })
    }






    //Create or find mpChannel
    fichiers = fs.readFileSync(path);
    let dataDmChannel = JSON.parse(fichiers);


    let mpChanel = dataDmChannel[guildMember.user.id];
    if(mpChanel != null){
        try{
            mpChanel = await bot.channels.fetch(mpChanel);
        }catch(e){
            console.log("ca n'existe pas");
            mpChanel = null;
        }
    }

    if (mpChanel == null) {
        let nickname = guildMember.user.tag.toLowerCase();

        let newNickname = "";
        let charBan = ["#", " ", "\"", "\'", "&", "(", ")", "~", "{", "[", "|", "`", "\\", "^", "@", "]", "}"];
        for (let j = 0; j < nickname.length; j++) {
            if (!charBan.includes(nickname[j])) {
                newNickname = newNickname + nickname[j];
            }
        }

        let options = {
            type: "text",
            parent: mpCategory.id,
            permissionOverwrites: [{
                id: await getEveryoneId(bot, guild.id),
                deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES'],
            }, {
                id: guildMember.user.id,
                allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES'],
            }, ],
        };
        mpChanel = await guild.channels.create(newNickname, options).then(guild => {
            return guild;
        })

        dataDmChannel[guildMember.user.id] = mpChanel.id;

        let donnees = JSON.stringify(dataDmChannel);
        fs.writeFileSync(path, donnees);
    }
    return mpChanel;
};

module.exports.help = {
    name: "createPrivateChannel"
};