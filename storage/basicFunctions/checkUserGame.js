const config = require('../config.json');
const fs = require("fs");
const path = config.location + "/storage/data/specialChannelList/";




module.exports.run = async (bot, message,callback) => {
    return await fs.readdir(path, async (err, folders) => {

        for (let index = 0; index < folders.length; index++) {
            const element = folders[index];
            fichiers = fs.readFileSync(path + element);
            let dataSpecialChannel = JSON.parse(fichiers);

            try{
                if(dataSpecialChannel.players!=null){
                    if(dataSpecialChannel.players.includes(message.author.id)){
                        callback(dataSpecialChannel.name);
                        return;
                    }
                }
            }catch(e){
            }
        }
        callback(false);
        return;
    });
}

module.exports.help = {
    name: "checkUserGame"
};