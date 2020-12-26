const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "Reactor_system";

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const reactorEmbed = new Discord.MessageEmbed();
    reactorEmbed.setTitle("Système du réacteur");

    if (!teamData.data["Reactor_system"]["reactor"]) {
        reactorEmbed.setColor('#0099ff');
        reactorEmbed.setDescription("Le réacteur est désactivé\nCliquez sur ▶️ et entrez la séquence d'activation pour activer le réacteur");
        reactions.push("▶️");
    } else {
        reactorEmbed.setColor('#0099ff');
        reactorEmbed.setDescription("Le réacteur est activé\n" +
            "Les réserves de carburant permettent de parcourir encore 212 parsecs");
    }

    message.channel.send(reactorEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "menu"
};