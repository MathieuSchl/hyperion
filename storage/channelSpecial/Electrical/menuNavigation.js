const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const system = "Navigation";
const path = config.location + "storage/channelSpecial/Electrical/electricalGame.json";
const pathElectricalGame = config.location + "/storage/channelSpecial/Electrical/electricalGame.json";

const categoryEscapeName = "Escape game - Epreuve DVFL";


async function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}




module.exports.run = async (bot, message, teamData) => {
    teamData.data.Electrical.systemActive = system;
    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

    let players = teamData.players;
    let length = players.length;

    let fichiers = fs.readFileSync(pathElectricalGame);
    let dmData = JSON.parse(fichiers);

    const electricalEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff');
    electricalEmbed.setTitle("Configuration du sytème électrique");
    electricalEmbed.setDescription("Dysfonctionnement du module d'alimentation du système de navigation\n" +
        "Veuillez recalibrer le sytème en activant les différents modules d'énergie\n" +
        "Le réacteur à besoin de `" + dmData[system].end + "` unités d'énergie pour fonctionner\n" +
        "Les commandes ont été répatient entre les techniciens:\n```");

    for (let player of players) {
        player = await message.guild.members.fetch(player);
        if(player.nickname==null){
            electricalEmbed.setDescription(electricalEmbed.description + "-" + player.user.username + "\n");
        }else{
            electricalEmbed.setDescription(electricalEmbed.description + "-" + player.nickname + "\n");
        }
    }

    electricalEmbed.setDescription(electricalEmbed.description + "```");

    message.channel.bulkDelete(1).catch(() => {});
    message.channel.send(electricalEmbed);

    let authorId;
    let messageReactions = Array.from(message.reactions.cache);
    for (let messageReaction of messageReactions) {
        if (messageReaction[1].count !== 1) {
            let reactUsers = Array.from(await messageReaction[1].users.fetch());
            for (let i = 0; i < reactUsers.length; i++) {
                if (!reactUsers[i][1].bot)
                    authorId = reactUsers[i][1].id;
            }
            break;
        }
    }

    if (authorId == null) return;

    let guildId = message.guild.id;
    let guild = await bot.guilds.fetch(guildId);

    if (length < 2) {
        message.channel.send("Joueurs insufisant 😥");
        return;
    }

    let reacToUsers = [];

    fichiers = fs.readFileSync(path);
    let donneElec = JSON.parse(fichiers);

    let valToSend = donneElec[system].emojisName;
    let validationText = await between(0, length - 1);

    for (let i = 0; i < length; i++) {
        let rdm = await between(0, valToSend.length - 1);
        reacToUsers.push([valToSend[rdm]]);
        valToSend.splice(rdm, 1);
    }

    for (let i = valToSend.length - 1; i >= 0; i--) {
        let rdm = await between(0, length - 1);
        let newEmojiToPush = valToSend[i]
        while (reacToUsers[rdm].includes(newEmojiToPush)) {
            rdm = await between(0, length - 1);
        }
        reacToUsers[rdm].push(newEmojiToPush);
        valToSend.splice(i, 1);
    }




    for (let i = 0; i < length; i++) {
        let guildMember = await guild.members.fetch(players[i]);
        let mpChanel = await bot.basicFunctions.get("createPrivateChannel").run(bot, guild, guildMember);

        let nbMessages = Array.from(await mpChanel.messages.fetch()).length;
        if (nbMessages > 0) mpChanel.bulkDelete(nbMessages).catch();
        mpChanel.send("<@" + guildMember.user.id + ">");
        mpChanel.send("Activation du système de navigation en cours\n" +
                "Le système de navigation a besoin de `" + dmData[system].end + "` unités d'énergie pour fonctionner\n" +
                "Veuillez cliquer sur les boutons ci dessous pour activer les modules nécessaires")
            .then(async function (msg) {
                for (let reaction of reacToUsers[i]) {
                    let emoji = await bot.basicFunctions.get("findEmoji").run(message.guild, reaction);
                    try {
                        msg.react(emoji);
                    } catch (e) {

                    }
                }
            });

        if (validationText === i) {
            mpChanel.send("Appuyer sur ☑️ pour confirmer la recalibration")
                .then(msg => {
                    msg.react("☑️");
                });
        }

        /*
        console.log(reacToUsers[i]);
        VCmembers[i][1].send("La resynchronisation du module \"Réacteur\" est en cour veuillez activer les modules nécessaires.").then(msg => {
            for (let react of reacToUsers[i]) {
                let emoji = bot.basicFunctions.get("findEmoji").run(message.guild, react);
                console.log(emoji);
                //msg.react(emoji);
            }
        })
        */
    }



    /*
    let reactions = [];

    reactions.push(await bot.basicFunctions.get("findEmoji").run(message.guild, "m5"));
    reactions.push(await bot.basicFunctions.get("findEmoji").run(message.guild, "p5"));

    message.channel.send("Appuyer sur ☑️ pour confirmer la recalibration").then(msg => {
        msg.react("☑️");
    });
    */
}

module.exports.help = {
    name: "menuNavigation"
};