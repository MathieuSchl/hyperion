const Discord = require("discord.js");
const config = require("../config.json");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

module.exports.run = async (bot, message, args, keys, commands)=>{
    var manEmbed = new Discord.MessageEmbed()
        .setColor("#C3482D");
    if(args.length<3) manEmbed.setDescription(commands.get("man")["manuel"]["man"]);
    else{
        if(!keys.includes(args[2])) manEmbed.setDescription("Commande \""+args[2]+"\" non reconnu");
        else{
            try{
                try {
                    manEmbed.setDescription(await commands.get(args[2]).manuel(bot,config.prefix, message));
                }catch (ttt) {
                    if(manEmbed.setDescription(commands.get(args[2])["manuelview"]["view"])) manEmbed.setDescription(commands.get(args[2])["manuel"]["man"]);
                }
                    }catch(error) {
                manEmbed.setDescription("Commande \""+args[2]+"\" n'a pas de manuel");
                console.log("Commande \""+args[2]+"\" na pas de manuel")
            }
        }
    }
    message.channel.send(manEmbed);
};


module.exports.help = {
    name: "man"
};

module.exports.manuel = {
    man: "man permet d'afficher le manuel d'une fonction\n" +
        "Pour ce faire il faut écrire dans le terminal:\n" +
        "`"+config.prefix+" man [nom de la commande]`"
};

module.exports.manuelview = {
    view: true
};