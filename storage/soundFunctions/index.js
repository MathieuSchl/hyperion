const config = require('../config.json');
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

module.exports.run = async (bot) => {
    fichiers = fs.readFileSync(path + "soundData.json");
    let soundData = JSON.parse(fichiers);

    if (!soundData.available || soundData.soundList.length === 0) {
        return;
    }

    soundData.available = false;
    action = soundData.soundList[0];
    soundData.soundList.splice(0, 1);

    let donnees = JSON.stringify(soundData);
    fs.writeFileSync(path + "soundData.json", donnees);

    if (action.actionStart) bot.soundFunctions.get(action.command).run(bot, action.idTextChannel);

    let teamData = await bot.basicFunctions.get("teamData").open(action.idTextChannel);
    let guild = await bot.guilds.fetch(action.idGuild);
    let Vc = await bot.channels.fetch(teamData.vocal);
    Vc.join().then(connection => {
        const dispatcher = connection.play(path + "/../sounds/" + action.soundToPlay, {
            volume: 0.5
        });

        dispatcher.on('finish', async function () {
            Vc.leave();

            fichiers = fs.readFileSync(path + "soundData.json");
            let soundData = JSON.parse(fichiers);

            soundData.available = true;

            let donnees = JSON.stringify(soundData);
            fs.writeFileSync(path + "soundData.json", donnees);

            if (!action.actionStart) bot.soundFunctions.get(action.command).run(bot, action.idTextChannel);

            await bot.basicFunctions.get("wait").run(5000);
            bot.soundFunctions.get("index").run(bot);
            return;
        });
    }).catch(async function (err) {
        if (err.name === "Error [VOICE_CONNECTION_TIMEOUT]") {
            user.voice.channel.leave();

            fichiers = fs.readFileSync(path + "soundData.json");
            let soundData = JSON.parse(fichiers);

            soundData.soundList.splice(0, 0, action);
            soundData.available = true;

            let donnees = JSON.stringify(soundData);
            fs.writeFileSync(path + "soundData.json", donnees);

            await bot.basicFunctions.get("wait").run(5000);
            bot.soundFunctions.get("index").run(bot);
            return;
        }
        //console.log(err==="Error [VOICE_CONNECTION_TIMEOUT]: Connection not established within 15 seconds.")
        console.log("Erreur lors de la connection au channel : \n" + err)
    })
}

module.exports.help = {
    name: "index"
};



/*
{
        "soundToPlay": "alarm_oxygen.mp3",
        "idUser": "210392675478667269",
        "idGuild": "691301139953483826",
        "idChannel": "776855881098199101",
        "command": "startOxygenEvent"
    }
*/