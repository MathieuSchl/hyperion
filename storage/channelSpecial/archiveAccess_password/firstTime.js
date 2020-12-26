const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message) => {
    message.channel.bulkDelete(100);
    bot.basicFunctions.get("deleteAll").run(bot,message.channel);
    message.channel.send("To return to the previous page, click on ↩️\n\n")
        .then(msg => {
            msg.react("↩️");
        });
    
    message.channel.send("Please enter the password");
    return
}

module.exports.help = {
    name: "firstTime"
};