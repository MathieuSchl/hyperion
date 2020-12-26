const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args)=>{
    message.delete();
    message.channel.send("pong")
        .then(msg => {
            msg.delete({ timeout: 10000 })
        });
};


module.exports.help = {
    name: "ping"
};

module.exports.manuel = {
    man: "Cette commande renvoie le message \"pong\" si le bot est connecté et qu'il peut lire dans ce channel"
};

module.exports.manuelview = {
    view: true
};