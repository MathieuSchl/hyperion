const config = require('../../config.json');
const fs = require("fs");
let request = require(`request`);


module.exports.run = async (bot, message, args)=>{
    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    var attachmentsKeys = Array.from( message.attachments.keys() );
    var url = message.attachments.get(attachmentsKeys[0]).url;
    var name = message.attachments.get(attachmentsKeys[0]).name;

    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(donnePath.pwd+name));


    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
};

module.exports.help = {
    name: "giveFiles"
};