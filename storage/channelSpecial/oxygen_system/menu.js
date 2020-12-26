const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');

module.exports.run = async (bot, message, teamData) => {
    let reactions = [];

    const oxygenEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff');
    oxygenEmbed.setDescription("```");

    try{
        if (teamData.data.game_event.oxygen === true) {
            if (teamData.data.oxygen_system.oxygene_generator !== true) {
                oxygenEmbed.setTitle("Les réserves d'oxygènes sont dans un état critique");
                oxygenEmbed.setDescription(oxygenEmbed.description + "Il est recommandé d'activer le générateur d'oxygène de secours\n");
                oxygenEmbed.setDescription(oxygenEmbed.description + "Pour réactiver le générateur cliquez sur 🚨\n\n");
                reactions.push("🚨");
            } else {
                oxygenEmbed.setTitle('Les systèmes à oxygène fonctionnent correctement');
            }
        } else {
            oxygenEmbed.setTitle('Les systèmes à oxygène fonctionnent correctement');
        }
    }catch(e){
        oxygenEmbed.setTitle('Les systèmes à oxygène fonctionnent correctement');
    }

    let oxy = teamData.data.oxygen_system["reserve"];
    oxygenEmbed.setDescription(oxygenEmbed.description + "Les réserves d'oxygènes sont remplies à " + oxy + "% de leurs capacités \n");
    let temp = teamData.data.oxygen_system["ship_temp"];
    oxygenEmbed.setDescription(oxygenEmbed.description + "La température intérieure du vaisseau est de " + temp + "°C\n");
    let genOxy = teamData.data.oxygen_system["oxygene_generator"];
    if (genOxy) {
        oxygenEmbed.setDescription(oxygenEmbed.description + "Le générateur d'oxygène est activé\n");
    } else {
        oxygenEmbed.setDescription(oxygenEmbed.description + "Le générateur d'oxygène est désactivé\n");
    }

    try{
        if (teamData.data.game_event.oxygen === true) {
            if (teamData.data.oxygen_system.oxygene_generator === true) {
                oxygenEmbed.setDescription(oxygenEmbed.description + "\nAugmentation des réserves d'oxygènes\nLes systèmes sont stables\n");
            } else {
                oxygenEmbed.setDescription(oxygenEmbed.description + "\nLes réserves d'oxygènes sont dans un état critique. Risque de suffocation du personnel important.\n");
            }
        } else {
            oxygenEmbed.setDescription(oxygenEmbed.description + "\nLes systèmes fonctionnent normalement\n");
        }
    }catch(e){
        oxygenEmbed.setDescription(oxygenEmbed.description + "\nLes systèmes fonctionnent normalement\n");
    }

    oxygenEmbed.setDescription(oxygenEmbed.description + "```");

    message.channel.send(oxygenEmbed).then(msg => {
        for (let reaction of reactions) {
            msg.react(reaction);
        }
    });
}

module.exports.help = {
    name: "menu"
};