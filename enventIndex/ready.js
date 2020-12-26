const { get } = require("request");
const config = require("../storage/config.json");
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

async function setBotSoundToAvailable(){
    fichiers = fs.readFileSync(path+"soundData.json");
    soundData = JSON.parse(fichiers);

    soundData.available = true;

    donnees = JSON.stringify(soundData);
    fs.writeFileSync(path+"soundData.json", donnees);
}

module.exports.run = async (bot) => {
    console.log(" ");
    console.log("Logged in as : " + bot.user.tag);
    console.log(" ");

    bot.basicFunctions.get("activity").run(bot);

    bot.enventIndex.get("runCronTables").run(bot);
    bot.enventIndex.get("catchMessageInSpecialChannels").run(bot);

    await setBotSoundToAvailable();
    bot.soundFunctions.get("index").run(bot);

    
    bot.basicFunctions.get("rulesUpdate").run(bot);
};


module.exports.help = {
    name: "ready"
};