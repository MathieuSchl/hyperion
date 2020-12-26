const config = require('../../config.json');
const fs = require("fs");
const path = config.location + "storage/data/specialChannelList.json";
const pathToAdd = config.location + "storage/channelSpecial/game/gameFiles/"


module.exports.run = async (bot, message, args) => {
    args.splice(0, 1);
    if (args.length <= 0) {
        message.channel.send("Pas assez d'arguments\nPour les lancer utilisez la command `run [fichier.exe]`")
            .then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
        return;
    }

    let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
    let pwd = teamData.data.pwd;

    pwd = pathToAdd + pwd + args[0]
    if (fs.existsSync(pwd)) {
        bot.basicFunctions.get("runExe").run(bot,message,args[0]);
        return;
    } else {
        message.delete();
        message.channel.send("Le fichier `" + args[0] + "` n'est pas valide")
            .then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
        return;
    }
};

module.exports.help = {
    name: "run"
};