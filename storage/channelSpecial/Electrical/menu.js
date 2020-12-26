const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const system = "Electrical";

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const electricalEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff');
    electricalEmbed.setTitle("Configuration du sytème électrique");
    electricalEmbed.setDescription("```")

    if (!(teamData.data[system]["reactor"] && teamData.data[system]["navigation"] && teamData.data[system]["oxygen"])) {
        electricalEmbed.setDescription(electricalEmbed.description + "Certains systèmes ont besoin d'être rééquilibré\n");
    } else {
        electricalEmbed.setDescription(electricalEmbed.description + "Tous les systèmes fonctionnent normalement\n");
    }

    if (!teamData.data[system]["reactor"]) {
        electricalEmbed.setDescription(electricalEmbed.description + "1️⃣ Le système du réacteur :   Action requise\n");
        reactions.push("1️⃣");
    } else {
        electricalEmbed.setDescription(electricalEmbed.description + "1️⃣ Le système du réacteur :   Fonctionnel\n");
    }

    if (!teamData.data[system]["navigation"]) {
        electricalEmbed.setDescription(electricalEmbed.description + "2️⃣ Le système de navigation : Action requise\n");
        reactions.push("2️⃣");
    } else {
        electricalEmbed.setDescription(electricalEmbed.description + "2️⃣ Le système de navigation : Fonctionnel\n");
    }

    if (!teamData.data[system]["oxygen"]) {
        electricalEmbed.setDescription(electricalEmbed.description + "3️⃣ Le système d'oxygène :     Action requise\n");
        reactions.push("3️⃣");
    } else {
        electricalEmbed.setDescription(electricalEmbed.description + "3️⃣ Le système d'oxygène :     Fonctionnel\n");
    }

    electricalEmbed.setDescription(electricalEmbed.description + "```")

    message.channel.send(electricalEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "menu"
};