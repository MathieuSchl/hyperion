const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require("fs");

const title = "Activation du générateur d'oxygène";



async function createEmbed(teamData) {
    let dioxygene = teamData.data.oxygen_system.dioxygene;
    let diazote = teamData.data.oxygen_system.diazote;
    let carbone = teamData.data.oxygen_system["dioxyde de carbone"];
    let temp = teamData.data.oxygen_system.temp;

    const activationOxygenGenerator = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title)
        .setDescription("Activation du générateur d'oxygène\n" +
            "Veuillez saisir les valeurs de chaque donnée si dessous\n" +
            "Dioxygene = " + dioxygene + "%\n" +
            "Diazote = " + diazote + "%\n" +
            "Dioxyde de carbone = " + carbone + "%\n" +
            "Température de conservation = " + temp + "°C\n");
    return activationOxygenGenerator;
}



module.exports.start = async (bot, channel, teamData) => {

    teamData.data.oxygen_system.dioxygene = 0;
    teamData.data.oxygen_system.diazote = 0;
    teamData.data.oxygen_system["dioxyde de carbone"] = 0;
    teamData.data.oxygen_system.temp = 0;
    teamData.data.oxygen_system.statusActivation = 1;
    await bot.basicFunctions.get("teamData").write(channel.id, teamData);

    channel.bulkDelete(100);
    bot.basicFunctions.get("deleteAll").run(bot, channel);
    channel.send(await createEmbed(teamData));
    channel.send("Veuillez entrer la valeur du dioxygene");

    return;
}

module.exports.newVal = async (bot, message, teamData) => {
    if (teamData.data.oxygen_system.statusActivation >= 5) return;

    await message.channel.messages.fetch().then(async function (messages) {
        await messages.array().forEach(async function (msg) {
            if (!msg.deleted) {
                if (msg.content.split(" ")[0] === "ERROR") {
                    msg.delete().catch("Erreur delete ERROR");
                    await bot.basicFunctions.get("wait").run(50);
                }
            }
        });
    })

    if (isNaN(parseInt(message.content, 10))) {
        message.channel.send("ERROR   `" + message.content + "` n'est pas un nombre\nVeuillez entrer à nouveau la valeur").then(msg => {
            setTimeout(function () {
                if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
            }, 15000);
        });
        return
    }

    setTimeout(function () {
        message.channel.bulkDelete(1).catch("Erreur delete last message");
    }, 50);

    let mess = "";

    switch (teamData.data.oxygen_system.statusActivation) {
        case 1:
            teamData.data.oxygen_system.dioxygene = parseInt(message.content, 10);
            mess = "Veuillez entrer la valeur du diazote";
            teamData.data.oxygen_system.statusActivation++;
            break;
        case 2:
            teamData.data.oxygen_system.diazote = parseInt(message.content, 10);
            mess = "Veuillez entrer la valeur du dioxyde de carbone";
            teamData.data.oxygen_system.statusActivation++;
            break;
        case 3:
            teamData.data.oxygen_system["dioxyde de carbone"] = parseInt(message.content, 10);
            mess = "Veuillez entrer la valeur de la température";
            teamData.data.oxygen_system.statusActivation++;
            break;
        case 4:
            teamData.data.oxygen_system.temp = parseInt(message.content, 10);
            teamData.data.oxygen_system.statusActivation++;
            break;
        case 5:
            break;
        default:
            mess = "ERROR Erreur avec les données sauvegardé\nVeuillez cliquer sur ↩️ pour revenir en arrière";
            setTimeout(function () {
                bot.basicFunctions.get("backButton").run(message);
            }, 1000);
    }

    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

    message.channel.messages.fetch().then(messages => {
        messages.array().reverse().forEach(async function (msg) {
            if (!msg.deleted) {
                if (msg.embeds.length != 0) {
                    if (msg.embeds[0].title === title) {
                        msg.edit(await createEmbed(teamData)).catch(() => {
                            console.log("edit error");
                        });
                    }
                }
            }
        });
    })

    if (teamData.data.oxygen_system.statusActivation >= 5) {
        teamData = await finDactivation(bot, message, teamData);
        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
        return;
    }

    await bot.basicFunctions.get("wait").run(250);
    message.channel.send(mess);

    return;
}

async function finDactivation(bot, message, teamData) {
    await bot.basicFunctions.get("wait").run(100);

    let resultActivation = true;
    if (teamData.data.oxygen_system.dioxygene !== 25) resultActivation = false;
    if (teamData.data.oxygen_system.diazote !== 74) resultActivation = false;
    if (teamData.data.oxygen_system["dioxyde de carbone"] !== 1) resultActivation = false;
    if (teamData.data.oxygen_system.temp !== -183) resultActivation = false;

    message.channel.send("Test en cours veuillez patienter").then(msg => {
        setTimeout(function () {
            if (!msg.deleted) msg.delete().catch("Erreur delete wait message");
        }, 5000);
    });
    await bot.basicFunctions.get("wait").run(5100);

    if (resultActivation) {
        message.channel.send("Réussite des tests\nCliquez sur ✅ pour activer le générateur").then(msg => {
            msg.react("✅");
        });
    } else {
        message.channel.send("Echec des tests\n"+
        "Cliquez sur 🚨 pour reessayer d'activer le générateur\n"+
        "Cliquez sur ↩️ pour revenir en arrière").then(msg => {
            msg.react("🚨");
            msg.react("↩️");
        });
    }

    //teamData.data.oxygen_system["dioxygene"] = 25;
    //teamData.data.oxygen_system["diazote"] = 74;
    //teamData.data.oxygen_system["dioxyde de carbone"] = 1;
    //teamData.data.oxygen_system["temp"] = -183;

    return teamData;
}

module.exports.help = {
    name: "changeData"
};