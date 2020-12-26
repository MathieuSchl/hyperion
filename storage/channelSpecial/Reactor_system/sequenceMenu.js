const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "Reactor_system";

const buttonEmoji = ["white_button", "blue_button", "blueSky_button", "purple_button", "pink_button", "orange_button", "red_button", "green_button", "brun_button", "yellow_button"];


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const reactorEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000');
    reactorEmbed.setTitle("Système d'activation du réacteur");

    reactorEmbed.setDescription("Le réacteur est désactivé\nVeuillez entrer la séquence d'activation du réacteur pour l'activer");

    let allButton = shuffle(buttonEmoji);
    for(let color of allButton){
        reactions.push(await bot.basicFunctions.get("findEmoji").run(message.guild, color));
    }

    message.channel.send(reactorEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "sequenceMenu"
};