const Discord = require("discord.js");
const config = require("../config.json");


module.exports.run = async (bot, message, args, keys, commands,prefix)=>{
    keys.sort();
    var helpEmbed = new Discord.MessageEmbed();
    helpEmbed.setColor("#B154BE");
    helpEmbed.setDescription("Pour me parler tes messages doivent commencer par \""+prefix+"\"\nLa liste de instructions que je comprends est ci-dessous:");

    for (var i = 0; i < keys.length; i++) {
        try{
            if(commands.get(keys[i])["manuelview"]["view"]) helpEmbed.setDescription(helpEmbed.description+"\n-"+keys[i]);
            else console.log("La commande "+keys[i]+" n'est pas envoyé");
        }catch(error) {
            console.log("Commande \""+keys[i]+"\" na pas de manuel")
        }
    }
    helpEmbed.setDescription(helpEmbed.description+"\nPour voir comment utiliser une commande fais \""+prefix+" man [commande]\"");
    message.channel.send(helpEmbed);
};

module.exports.help = {
    name: "help"
};

module.exports.manuel = {
    man: "La commande help permet de visualiser les différentes commandes que tu peux utiliser.\n" +
        "Pour ce faire il faut écrire dans le terminal:\n" +
        "`"+config.prefix+" help`"
};

module.exports.manuelview = {
    view: true
};
