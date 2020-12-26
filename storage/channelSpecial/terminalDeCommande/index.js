const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message, args)=>{
    //console.log(bot.specialChannel.terminalDeCommande)

    var attachmentsKeys = Array.from( message.attachments.keys() );

    try {
        if (attachmentsKeys.length!==0){
            bot.specialChannel.terminalDeCommande.get("giveFiles").run(bot,message,args);
        }
        else {
            bot.specialChannel.terminalDeCommande.get(args[0]).run(bot,message,args);
        }
    }
    catch(error) {
        //console.log(error)
        bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
    }
}

module.exports.help = {
    name: "index"
};