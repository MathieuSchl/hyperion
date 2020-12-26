const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "Navigation_system";

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const navigationEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff');
    navigationEmbed.setTitle("System de navigation");

    if (!teamData.data[System]["shipsCoordinates"]) {
        navigationEmbed.setDescription("Coordonnée du vaisseau inconnu\nCoordonnée de la destination valide: Hotel 784 November 286 Papa 715 \nLieu de destination: Terre");
        setTimeout(() => {
            message.channel.send("Veuillez entrer manuellement les coordonnées du vaisseau")
          }, 100);
          /*
    } else if (!teamData.data[System]["earthCoordinate"]) {
        navigationEmbed.setDescription("Coordonnée du vaisseau valide: Sierra 854 Charlie 190 Yankee 476\nCoordonnée de la destination inconnue");
        setTimeout(() => {
            message.channel.send("Veuillez entrer manuellement les coordonnées de la destination")
          }, 100);
          */
    } else {
        navigationEmbed.setDescription("Coordonnée du vaisseau valide: Sierra 854 Charlie 190 Yankee 476\nCoordonnée de la destination valide: Hotel 784 November 286 Papa 715 \nLieu de destination: Terre");
        setTimeout(() => {
            message.channel.send("Coordonnées valides, cliquez sur ☑️ pour lancer le voyage").then(msg => {
                msg.react("☑️");
            });
          }, 100);
    }



    message.channel.send(navigationEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "menu"
};