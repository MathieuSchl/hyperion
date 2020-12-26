const config = require('../../config.json');
const fs = require("fs");
const passwordSystem = "archiveAccess";
const system = passwordSystem+"_password";
const passWords = ["obi wan","obiwankenobi","obiwan kenobi","obi wan kenobi","obi wankenobi","obi-wankenobi","obi wan","obi-wan","kenobi","gonk"];

module.exports.run = async (bot, message, teamData) => {
    let channelMessages = message.channel.messages;
    await channelMessages.fetch().then(messages => {
        let i = 0;
        if (Array.from(messages).length < 3) {
            bot.specialChannel[passwordSystem].get("firstTime").run(bot, message);
            return
        }
        messages.array().reverse().forEach(msg => {
            if (i >= 2) {
                if(!msg.deleted) msg.delete().catch();
            }
            i++;
        });

    })

    if (teamData.data[passwordSystem] == null) {
        teamData.data[passwordSystem] = {};
        teamData.data[passwordSystem].unlock = false;
        teamData.data[passwordSystem].nbTest = 0;
        teamData.data[passwordSystem].nbTest = 0;
    }

    if (passWords.includes(message.content.toLowerCase())) {
        teamData.data[passwordSystem].unlock = true;
        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
        
        message.channel.send("Accepted password\nWelcome on board captain").then(msg => {
            setTimeout(function () {
                if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
            }, 5000);
        });
        await bot.basicFunctions.get("wait").run(5100);
        bot.specialChannel[system].get("unloked").run(bot, message, teamData);
        bot.basicFunctions.get("scoreBoard").reaload(bot);
        bot.basicFunctions.get("eventLuncher").run(bot,teamData,message);
        return
    } else {
        teamData.data[passwordSystem].nbTest++;
    }

    let mess = "ERROR : incorrect password";

    message.channel.send(mess);

    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
    return
}

module.exports.help = {
    name: "checkPassword"
};