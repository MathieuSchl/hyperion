const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const path = config.location + "/storage/data/GlobaleData.json";


async function getAllPlayers(bot,idChannel){
    let teamData = await bot.basicFunctions.get("teamData").open(idChannel);
    if(teamData.players.length===0) return "Il n'y a pas de joueur dans cette équipe 😥";
    let mess = "";
    const channel = await bot.channels.fetch(idChannel);
    for(let i=0;i<teamData.players.length;i++){
        const member = await channel.guild.members.fetch(teamData.players[i]);
        if(member.nickname){
            mess=mess+"- "+member.nickname+"\n";
        }else{
            mess=mess+"- "+member.user.username+"\n";
        }
    }
    return mess;
}

module.exports.run = async (bot, idChannel) => {
    fichiers = fs.readFileSync(path);
    let data = JSON.parse(fichiers);

    const channel = await bot.channels.fetch(idChannel);
    const startEmbed = new Discord.MessageEmbed()

    channel.bulkDelete(50);

    if (data.gameStarted) {
        startEmbed.setColor('#28FF00');
        startEmbed.setTitle("Préparez vous au départ");
        startEmbed.setDescription("Lorsque vous êtes prêt cliquez sur ✅ (tous les joueurs doivent cliquer sur la réaction pour lancer la partie)\n" +
            "Veuillez d'abord vérifier que tous les membres de votre équipes sont présents dans la liste suivante:");
        startEmbed.setDescription(startEmbed.description + "```\n");
        startEmbed.setDescription(startEmbed.description + await getAllPlayers(bot,idChannel));
        startEmbed.setDescription(startEmbed.description + "```");
        channel.send(startEmbed).then(mgs => {
            mgs.react("✅");
        })
    } else {
        startEmbed.setColor('#F0FF00');
        startEmbed.setTitle("Ce n'est pas encore l'heure veuillez patientez 😀");
        startEmbed.setDescription("La connexion au vaisseau \"Hyperion\" n'est pas encore disponible\n" +
            "Veuillez vérifier que tous les membres de votre équipes sont présents dans la liste suivante:\n");
        startEmbed.setDescription(startEmbed.description + "```\n");
        startEmbed.setDescription(startEmbed.description + await getAllPlayers(bot,idChannel));
        startEmbed.setDescription(startEmbed.description + "```");
        channel.send(startEmbed);
    }
}

module.exports.help = {
    name: "menu"
};