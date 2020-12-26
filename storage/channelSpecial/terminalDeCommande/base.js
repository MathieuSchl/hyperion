const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    message.channel.bulkDelete(20);
    bot.basicFunctions.get("deleteAll").run(bot,message.channel);

    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    donnePath.pwd=config.locationRacine;

    let donnees = JSON.stringify(donnePath);
    fs.writeFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json", donnees);


    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
};

module.exports.help = {
    name: "base"
};

