const config = require('../../config.json');
const fs = require("fs");
const passwordSystem = "oxygen_system";
const system = passwordSystem+"_password"

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

    if (message.content === "erroné") {
        teamData.data[passwordSystem].unlock = true;
        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
        
        message.channel.send("Mot de passe accepté").then(msg => {
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

    let mess = "";
    switch (teamData.data[passwordSystem].nbTest) {
        case 1:
            mess = "Mot de passe erroné";
            break;
        case 2:
            mess = "Le mot de passe est erroné";
            break;
        case 3:
            mess = "Le mot de passe est erroné";
            break;
        case 4:
            mess = "Le mot de passe est `erroné`";
            break;
        case 5:
            mess = "Le mot de passe est \"erroné\"";
            break;
        default:
            mess = "Le mot de passe est `e-r-r-o-n-é`";
    }

    message.channel.send(mess);

    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
    return
}

module.exports.help = {
    name: "checkPassword"
};