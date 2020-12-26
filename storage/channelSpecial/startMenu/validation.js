const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, channelId) => {
    let teamData = await bot.basicFunctions.get("teamData").open(channelId);

    const reactorEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000');
    reactorEmbed.setTitle("Erreur pour la procédure de démarrage");

    reactorEmbed.setDescription("Pour activer la procédure de vous devez d'abord resoudre les problèmes suivant:\n```");


    let good = true;
    try{
        if (!teamData.data.Reactor_system.reactor) {
            good = false;
            reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez réactiver le réacteur\n");
        }
    }catch(e){
        reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez réactiver le réacteur\n");
    }
    
    try{
        if (!teamData.data.oxygen_system.oxygene_generator) {
            good = false;
            reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez réactiver le générateur d'oxygène\n");
        }
    }catch(e){
        reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez réactiver le générateur d'oxygène\n");
    }

    try{
        if (!(teamData.data.Electrical.reactor&&teamData.data.Electrical.navigation&&teamData.data.Electrical.oxygen)) {
            good = false;
            reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez rééquilibrer certains systèmes électriques\n");
        }
    }catch(e){
        reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez rééquilibrer certains systèmes électriques\n");
    }

    try{
        if (!teamData.data.Electrical.archiveAccess.unlock) {
            good = false;
            reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez déverrouiller les archives\n");
        }
    }catch(e){
        reactorEmbed.setDescription(reactorEmbed.description + "-Vous devez déverrouiller les archives\n");
    }
    


    if (good) return true;
    reactorEmbed.setDescription(reactorEmbed.description + "```");
    return reactorEmbed;
}

module.exports.help = {
    name: "validation"
};