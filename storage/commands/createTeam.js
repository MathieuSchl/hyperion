const config = require("../config.json");
const fs = require("fs");
const pathGlobaleData = config.location + "/storage/data/GlobaleData.json";
const pathMessage = config.location + "/storage/data/specialMessageList/";


async function getEveryoneId(bot, guildId) {
    let roles = Array.from(await bot.guilds.cache.get(guildId).roles.cache);
    for (let i = 0; i < roles.length; i++) {
        if (roles[i][1].name === "@everyone") {
            return roles[i][1].id;
        }
    }
    return null;
}

module.exports.run = async (bot, message, args) => {
    message.delete();

    fichiers = fs.readFileSync(pathGlobaleData);
    let data = JSON.parse(fichiers);
    const adminGame = data.adminList[message.channel.guild.id];

    let author = await message.guild.members.fetch(message.author);
    let authorRoles = Array.from(author.roles.cache);

    let userAdmin = false;
    for (let i = 0; i < authorRoles.length; i++) {
        const element = authorRoles[i];
        if (adminGame.includes(element[0])) {
            userAdmin = true;
            break;
        }
    }

    if (!userAdmin) {
        message.author.send("Vous n'êtes pas autorisé à faire ca");
        return;
    }
    if (args.length<3) {
        message.author.send("Vous devez renseigner un nom d'équipe");
        return;
    }

    let name = args[2];
    for (let i = 3; i < args.length; i++) {
        const element = args[i];
        name = name + " " + element;
    }

    const channel = await bot.channels.fetch(data.textChannel[message.channel.guild.id]);


    //create team role
    let roleId = null;
    await channel.guild.roles.create({
        data: {
            name: "équipe " + name,
        }
    }).then((role) => {
        roleId = role.id;
    })



    //create options
    let options = {
        type: "text",
        parent: channel.parentID,
        permissionOverwrites: [{
            id: await getEveryoneId(bot, channel.guild.id),
            deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        }, {
            id: roleId,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        }, ],
    };
    for (let i = 0; i < adminGame.length; i++) {
        const element = adminGame[i];
        options.permissionOverwrites.push({
            id: element,
            allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        })
    }



    //create gameChannel
    let gameChannelId = null;
    await channel.guild.channels.create("escape " + name, options).then(channel => {
        gameChannelId = channel.id;
    })

    //create chatChannel
    let chatChannelId = null;
    await channel.guild.channels.create("chat " + name, options).then(channel => {
        chatChannelId = channel.id;
    })

    //create voiceChannel
    options.type = "voice";
    let vocalChannelId = null;
    await channel.guild.channels.create("vocal " + name, options).then(channel => {
        vocalChannelId = channel.id;
    })

    //create team message
    let teamMessage = null;
    await channel.send("Si vous êtes dans l'équipe \"" + args[2] + "\" cliquez sur ✅").then(msg => {
        msg.react("✅");
        teamMessage = msg;
    });


    //create gameFile
    const gameFile = {
        "id": gameChannelId,
        "chat": chatChannelId,
        "vocal": vocalChannelId,
        "role": roleId,
        "message": teamMessage.id,
        "name": name,
        "type": "startMenu",
        "players": [],
        "startingTime": null,
        "endingTime": null,
        "data": {
            "game_event": {},
            "teamName": name,
            "pwd": "/"
        }
    }

    await bot.basicFunctions.get("teamData").write(gameFile.id, gameFile);

    const specialMessage = {
        "id": teamMessage.id,
        "channel": teamMessage.channel.id,
        "type": "addToTeam",
        "data": {
            "teamThannel": gameChannelId
        }
    }

    let donnees = JSON.stringify(specialMessage);
    fs.writeFileSync(pathMessage + (teamMessage.id) + ".json", donnees);


    //add role in roleList
    data.roleList[message.channel.guild.id].push(roleId);

    donnees = JSON.stringify(data);
    fs.writeFileSync(pathGlobaleData, donnees);
};


module.exports.help = {
    name: "createTeam"
};

module.exports.manuel = {
    man: "Cette commande renvoie le message \"pong\" si le bot est connecté et qu'il peut lire dans ce channel"
};

module.exports.manuelview = {
    view: true
};