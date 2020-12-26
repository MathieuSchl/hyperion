const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message) => {
    message.channel.bulkDelete(100);
    bot.basicFunctions.get("deleteAll").run(bot,message.channel);
    message.channel.send("Pour revenir en arrière cliquez sur ↩️\n\n")
        .then(msg => {
            msg.react("↩️");
        });
    
    message.channel.send("Veillez entrer le mot de passe");
    return
}

module.exports.help = {
    name: "firstTime"
};