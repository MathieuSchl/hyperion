const config = require('../../config.json');
const fs = require("fs");


function go(path,folder){
    return new Promise((resolve, reject) => {
        if(folder==="."){
            resolve(path);
        }
        else if(folder===".."){
            var folderPath = path.split("/");
            if (folderPath.length===2){
                resolve(null);
            }
            folderPath.splice(folderPath.length-2,2)
            path = "";
            for (var i = 0; i < folderPath.length; i++) {
                path = path + folderPath[i] + "/";
            }
            resolve(path);
        }else {
            path = path+folder+"/";
            fs.readdir(path, (err, theFolder) =>{
                if (theFolder==null){
                    resolve(undefined);
                }else{
                    resolve(path);
                }
            });
        }
    });
}


module.exports.run = async (bot, message, args)=>{
    message.channel.bulkDelete(20);
    bot.basicFunctions.get("deleteAll").run(bot,message.channel);

    fichiers = fs.readFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json");
    let donnePath = JSON.parse(fichiers);

    args.splice(0, 1);
    var pathChange = "";
    for (var i = 0; i < args.length; i++) {
        if(i===0){
            pathChange = args[i];
        }else {
            pathChange = pathChange +" "+ args[i];
        }
    }

    pathChange = pathChange.split("/");

    for (var i = 0; i < pathChange.length; i++) {
        if(pathChange[i]!==""){
            var res = await go(donnePath.pwd,pathChange[i]);
            donnePath.pwd = res;
            if (donnePath.pwd===undefined){
                message.channel.send("\""+pathChange[i]+"\" n'est pas un dossier valide");
                return ;
            }
            if (donnePath.pwd===null){
                message.channel.send("Vous êtes à la racine");
                return ;
            }
            let donnees = JSON.stringify(donnePath);
            fs.writeFileSync(config.location+"storage/ChannelSpecial/terminalDeCommande/data/pathAndUsers.json", donnees);

        }
    }
    await bot.basicFunctions.get("wait").run(250);
    bot.specialChannel.terminalDeCommande.get("ls").run(bot,message,args);
};

module.exports.help = {
    name: "cd"
};

