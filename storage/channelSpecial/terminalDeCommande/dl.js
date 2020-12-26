const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    message.channel.bulkDelete(20);
    bot.basicFunctions.get("deleteAll").run(bot,message.channel);
    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    args.splice(0,1);
    var files = [];
    var noFiles = [];
    for (var i = 0; i < args.length; i++) {
        try {
            if (fs.existsSync(donnePath.pwd+args[i])) {
                files.push(donnePath.pwd+args[i])
            }
            else{
                noFiles.push(args[i])
            }
        } catch(err) {
            console.log("err")
        }
    }
    var messToSend = "";
    if (noFiles.length!==0){
        if (noFiles.length===1){
            messToSend = "Le fichier \""+noFiles[0]+"\" n'est pas un fichier valide";
            message.channel.send(messToSend);
            await bot.basicFunctions.get("wait").run(100);
            var command = require("./ls.js");
            command.run(bot,message,args);
            await bot.basicFunctions.get("wait").run(100);
            return ;
        }
        messToSend = "Les fichiers ";
        for (var i = 0; i < noFiles.length; i++) {
            if (i!==0){
                messToSend=messToSend+", \""+noFiles[i]+"\"";
            }else {
                messToSend=messToSend+"\""+noFiles[i]+"\"";
            }
        }
        messToSend=messToSend+" ne sont pas des fichiers valides";
        if (files.length===0){
            await bot.basicFunctions.get("wait").run(100);
            var command = require("./ls.js");
            command.run(bot,message,args);
            await bot.basicFunctions.get("wait").run(100);
            message.channel.send(messToSend);
            return ;
        }
        messToSend=messToSend+"\n";
    }
    if (files.length===1){
        messToSend=messToSend+"Le fichier \""+files[0]+"\" à été téléchargé";
    }else{
        messToSend=messToSend+"Les fichiers ";
        for (var i = 0; i < files.length; i++) {
            if (i!==0){
                messToSend=messToSend+", \""+files[i]+"\"";
            }else {
                messToSend=messToSend+"\""+files[i]+"\"";
            }
        }
    }
    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
    await bot.basicFunctions.get("wait").run(500);
    message.channel.send(messToSend, { files: files })
};

module.exports.help = {
    name: "dl"
};