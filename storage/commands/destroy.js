const Discord = require("discord.js");
const config = require("../config.json");
const admin = ["210392675478667269"]

module.exports.run = async (bot, message, args)=>{
    message.delete();
    if (admin.includes(message.author.id)){
        message.channel.send("Arrêt du bot")
            .then(msg => {msg.delete({ timeout: 1500 })});
        bot.user.setActivity("Arrêt en cours", {type: "WATCHING"});
        await bot.basicFunctions.get("wait").run(2500);
        bot.destroy();

    }else{
        message.channel.send("<@"+message.author.id+"> tu n'es pas autorisé à faire cela")
            .then(msg => {
                msg.delete({ timeout: 10000 })
            });
    }
};


module.exports.help = {
    name: "destroy"
};

module.exports.manuel = {
    man: "man permet d'afficher le manuel d'une fonction\n" +
        "Pour ce faire il faut écrire dans le terminal:\n" +
        "`"+config.prefix+" man [nom de la commande]`"
};

module.exports.manuelview = {
    view: false
};