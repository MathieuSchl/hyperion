const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    args.splice(0,1);
    for (var i = 0; i < args.length; i++) {
        try {
            if (fs.existsSync(donnePath.pwd+args[i])) {
                fs.unlinkSync(donnePath.pwd+args[i])
                message.channel.send("Le fichier \""+args[i]+"\" à été suprimé")
            }
            else{
                message.channel.send("Le fichier \""+args[i]+"\" n'est pas valide")
            }
        } catch(err) {
            try{
                require('child_process').exec('rmdir '+donnePath.pwd+args[i], function (msg) { console.log(msg) });
            }catch(err){
                console.log("err")
            }
        }
    }

    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
};

module.exports.help = {
    name: "rm"
};