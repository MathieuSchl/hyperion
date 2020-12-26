const Discord = require("discord.js");
const config = require("../config.json");
const admin = ["210392675478667269"]

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (admin.includes(message.author.id)) {
        let category = 0;
        let voice = 0;
        let text = 0;
        let other = 0;

        let channels = Array.from(message.guild.channels.cache);
        for (let channel of channels) {
            channel = channel[1];
            switch (channel.type) {
                case 'category':
                    category++;
                    break;
                case 'text':
                    text++;
                    break;
                case 'voice':
                    voice++;
                    break;
                default:
                    other++;
            }
        }

        let sum = category + text + voice + other;
        message.channel.send("```Channels dans le serveur \"" + message.guild.name + "\"\n" +
            "Total      = " + sum + "\n" +
            " Categorie = " + category + "\n" +
            " Texte     = " + text + "\n" +
            " Vocal     = " + voice + "\n" +
            " Autre     = " + other + "\n" +
            "```")
    } else {
        message.channel.send("<@" + message.author.id + "> tu n'es pas autorisé à faire cela")
            .then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
    }
};


module.exports.help = {
    name: "Ccount"
};

module.exports.manuel = {
    man: "Cette commande renvoie le message \"pong\" si le bot est connecté et qu'il peut lire dans ce channel"
};

module.exports.manuelview = {
    view: true
};