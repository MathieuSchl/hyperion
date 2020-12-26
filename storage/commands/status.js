const Discord = require("discord.js");
const config = require("../config.json");
const admin = ["210392675478667269"]

module.exports.run = async (bot, message, args)=>{
    message.delete();
    if (admin.includes(message.author.id)){
        args.splice(0, 2);
        if(args.length===0){
            message.channel.send("<@"+message.author.id+"> Il n'y a pas de Message de status")
                .then(msg => {
                    msg.delete({ timeout: 5000 })
                });
            return
        }
        let newStatus = ""
        for(let i of args){
            newStatus = newStatus + " "+ i;
        }
        bot.user.setActivity(newStatus, {type: "PLAYING"});

    }else{
        message.channel.send("<@"+message.author.id+"> tu n'es pas autorisé à faire cela")
            .then(msg => {
                msg.delete({ timeout: 10000 })
            });
    }
};


module.exports.help = {
    name: "status"
};

module.exports.manuel = {
    man: "man permet d'afficher le manuel d'une fonction\n" +
        "Pour ce faire il faut écrire dans le terminal:\n" +
        "`"+config.prefix+" man [nom de la commande]`"
};

module.exports.manuelview = {
    view: false
};