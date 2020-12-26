const config = require("../config.json");
const fs = require("fs");
const path = config.location + "storage/soundFunctions/data/";

module.exports.run = async (bot, teamData, message) => {
    if (teamData.data.puzzleSolved == null) {
        teamData.data.puzzleSolved = 1;
    } else {
        teamData.data.puzzleSolved++;
    }



    if (teamData.data.puzzleSolved >= 3 && (teamData.data.game_event.oxygenActivation == null || teamData.data.game_event.oxygenActivation === false)) {
        teamData.data.game_event.oxygenActivation = true;
        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

        setTimeout(async function () {
            fichiers = fs.readFileSync(path + "soundData.json");
            soundData = JSON.parse(fichiers);

            let newEventSound = {
                "soundToPlay": "alarm_oxygen.mp3",
                "idUser": message.author.id,
                "idGuild": message.guild.id,
                "idTextChannel": teamData.id,
                "idChannel": teamData.vocal,
                "command": "startOxygenEvent",
                "actionStart":true
            }

            soundData.soundList.push(newEventSound);

            donnees = JSON.stringify(soundData);
            fs.writeFileSync(path + "soundData.json", donnees);

            await bot.basicFunctions.get("wait").run(250);
            bot.soundFunctions.get("index").run(bot);
        }, 300000)
    } else {
        await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);
    }
};

module.exports.help = {
    name: "eventLuncher"
};