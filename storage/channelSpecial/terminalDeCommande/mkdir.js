const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    require('child_process').exec('mkdir '+donnePath.pwd+args[1], function (msg) { console.log(msg) });

    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
};

module.exports.help = {
    name: "mkdir"
};

