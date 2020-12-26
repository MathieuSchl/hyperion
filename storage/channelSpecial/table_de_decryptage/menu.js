const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "table_de_decryptage";

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const decryptageEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff');
    decryptageEmbed.setTitle("Table de decryptage");

    decryptageEmbed.setDescription("Veuillez entrer votre nom de famille pour obtenir votre table de décryptage");



    message.channel.send(decryptageEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "menu"
};