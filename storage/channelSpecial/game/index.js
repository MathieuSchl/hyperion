const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message, args)=>{
    //console.log(bot.specialChannel.game)

    //var attachmentsKeys = Array.from( message.attachments.keys() );

    try {
        bot.specialChannel.game.get(args[0]).run(bot,message,args);
    }
    catch(error) {
        //console.log(error)
        bot.specialChannel.game.get("ls").run(bot,message,args);
    }
}

module.exports.help = {
    name: "index"
};