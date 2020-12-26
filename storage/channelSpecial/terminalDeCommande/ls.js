const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    if (donnePath.pwd==""||donnePath.pwd==null){
        donnePath.pwd=config.locationRacine;
    }

    var messageToSend = "```Path :\n"+donnePath.pwd+"\n\n";
    fs.readdir(donnePath.pwd, (err, theFolder) =>{
        var folders = [];
        var files = [];
        if (theFolder==null){
            message.channel.bulkDelete(20);
            bot.basicFunctions.get("deleteAll").run(bot,message.channel);
            message.channel.send("Il y a une erreur avec le chemin d'accès sauvegardé.\n Utilisez la command base pour le réinitialiser.");
            return;
        }
        for (var i = 0; i < theFolder.length; i++) {
            if(theFolder[i].split(".").length===1){
                folders.push(theFolder[i]);
            }else{
                files.push(theFolder[i]);
            }
        }

        messageToSend = messageToSend+"Folder :\n";
        for (var i = 0; i < folders.length; i++) {
            messageToSend = messageToSend+folders[i];
            for (var j = 0; j < 30-folders[i].length; j++) {
                messageToSend = messageToSend+" ";
            }
        }


        messageToSend = messageToSend+"\n\nFiles :\n";
        for (var i = 0; i < files.length; i++) {
            messageToSend = messageToSend+files[i];
            for (var j = 0; j < 30 - files[i].length; j++) {
                messageToSend = messageToSend+" ";
            }
        }

        messageToSend = messageToSend+"```";

        async function go(message,messageToSend){
            message.channel.bulkDelete(20);
            bot.basicFunctions.get("deleteAll").run(bot,message.channel);
            message.channel.send(messageToSend);
        }
        go(message,messageToSend);
    });


    let donnees = JSON.stringify(donnePath);
    fs.writeFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json", donnees);
};

module.exports.help = {
    name: "ls"
};