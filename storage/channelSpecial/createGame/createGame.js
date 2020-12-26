const config = require("../../config.json");
const fs = require("fs");
const pathGlobaleData = config.location + "/storage/data/GlobaleData.json";
const pathChannels = config.location + "/storage/data/specialChannelList/";
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

module.exports.run = async (bot, guild, name, hostUser) => {
    fichiers = fs.readFileSync(pathGlobaleData);
    let data = JSON.parse(fichiers);

    const adminGame = data.adminList[guild.id];



    //create team role
    let roleId = null;
    await guild.roles.create({
        data: {
            name: "Equipe " + name,
        }
    }).then((role) => {
        roleId = role.id;
    })



    //create options
    let options = {
        permissionOverwrites: [{
            id: await getEveryoneId(bot, guild.id),
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


    //create hostOptions
    let hostOptions = {
        permissionOverwrites: [{
            id: await getEveryoneId(bot, guild.id),
            deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        }, {
            id: hostUser.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        }, ],
    };
    for (let i = 0; i < adminGame.length; i++) {
        const element = adminGame[i];
        hostOptions.permissionOverwrites.push({
            id: element,
            allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'READ_MESSAGE_HISTORY', 'CONNECT'],
        })
    }


    //create CategoryChannel
    options.type = "category";
    let categoryChannelId = null;
    await guild.channels.create("Equipe " + name, options).then(channel => {
        categoryChannelId = channel.id;
    })
    options.parent = categoryChannelId;
    hostOptions.parent = categoryChannelId;

    //create leaveGame
    options.type = "text";
    let leaveGameId = null;
    let leaveMessageId = null;
    await guild.channels.create("❌╿Quitter la partie", options).then(async (channel) => {
        leaveGameId = channel.id;
        await channel.send("Si vous voulez quitter cette partie cliquez sur ❌").then(msg => {
            msg.react("❌");
            leaveMessageId = msg.id;
        })
    })

    let donnees = JSON.stringify({
        "id": leaveGameId,
        "type": "deleteAllMessage"
    });
    fs.writeFileSync(pathChannels + leaveGameId + ".json", donnees);


    //create invitePlayer
    options.type = "text";
    let invitePlayerChannelId = null;
    await guild.channels.create("🔎╿Inviter des joueurs", hostOptions).then(channel => {
        channel.send("<@" + hostUser.id + ">").then(msg => msg.delete());
        channel.send("Pour inviter un joueur veuillez le tagger dans ce channel\nEx: <@" + bot.user.id + ">");
        invitePlayerChannelId = channel.id;
    })



    //create removePlayer
    options.type = "text";
    let removePlayerChannelId = null;
    await guild.channels.create("🚫╿Exclure des joueurs", hostOptions).then(channel => {
        channel.send("Pour exclure un joueur veuillez le tagger dans ce channel\nEx: <@" + bot.user.id + ">");
        removePlayerChannelId = channel.id;
    })


    //create gameChannel
    options.type = "text";
    let gameChannelId = null;
    await guild.channels.create("🎮╿escape", options).then(async (channel) => {
        gameChannelId = channel.id;
    })

    //create chatChannel
    options.type = "text";
    let chatChannelId = null;
    await guild.channels.create("💬╿chat", options).then(channel => {
        chatChannelId = channel.id;
    })

    //create voiceChannel
    options.type = "voice";
    let vocalChannelId = null;
    await guild.channels.create("🔊╿vocal", options).then(channel => {
        vocalChannelId = channel.id;
    })

    //create team message

    /*
    let teamMessage = null;
    await channel.send("Si vous êtes dans l'équipe \"" + args[2] + "\" cliquez sur ✅").then(msg => {
        msg.react("✅");
        teamMessage = msg;
    });
    */


    const leaveMessage = {
        "id": leaveMessageId,
        "channel": leaveGameId,
        "emoji": ["❌"],
        "type": ["leaveGame"],
        "data": {
            "gameId": gameChannelId
        }
    }

    donnees = JSON.stringify(leaveMessage);
    fs.writeFileSync(pathMessage + (leaveMessageId) + ".json", donnees);


    
    donnees = JSON.stringify({
        "id": invitePlayerChannelId,
        "type": "invitePlayer",
        "data": {
            "gameId": gameChannelId
        }
    });
    fs.writeFileSync(pathChannels + invitePlayerChannelId + ".json", donnees);
    
    
    donnees = JSON.stringify({
        "id": removePlayerChannelId,
        "type": "removePlayer",
        "data": {
            "gameId": gameChannelId
        }
    });
    fs.writeFileSync(pathChannels + removePlayerChannelId + ".json", donnees);



    //create gameFile
    const gameFile = {
        "id": gameChannelId,
        "category": categoryChannelId,
        "chat": chatChannelId,
        "vocal": vocalChannelId,
        "leaveGame": leaveGameId,
        "leaveMessage": leaveMessageId,
        "invitePlayer": invitePlayerChannelId,
        "removePlayer": removePlayerChannelId,
        "role": roleId,
        "gameCreated": new Date(),
        "name": name,
        "gameType": "normal",
        "type": "startMenu",
        "players": [],
        "lastAction": new Date(),
        "startingTime": null,
        "endingTime": null,
        "data": {
            "game_event": {},
            "teamName": name,
            "pwd": "/"
        }
    }

    await bot.basicFunctions.get("teamData").write(gameFile.id, gameFile);


    //add role in roleList
    data.roleList[guild.id].push(roleId);

    donnees = JSON.stringify(data);
    fs.writeFileSync(pathGlobaleData, donnees);


    bot.specialChannel.createGame.get("addPlayerInTeam").run(bot, hostUser.id, gameChannelId, true);

    await bot.basicFunctions.get("wait").run(1000);
    bot.specialChannel.startMenu.get("menu").run(bot, gameChannelId);
}

module.exports.help = {
    name: "createGame"
};