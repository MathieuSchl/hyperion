const config = require('../config.json');
const fs = require("fs");
const path = config.location + "/storage/data/usersData/";

module.exports.open = async (bot, idUser) => {
    try {
        fichiers = fs.readFileSync(path + idUser + ".json");
        let dataSpecialChannel = JSON.parse(fichiers);

        return dataSpecialChannel;
    } catch (e) {
        const user = await bot.users.fetch(idUser);
        const newData = {
            "id": idUser,
            "userTag": user.tag,
            "textFirstTry": null,
            "timeFirstTry": null,
            "textTimeLastRun": null,
            "timeTimeLastRun": null,
            "textBestRun": null,
            "timeBestRun": null,
            "nbRun": null,
            "textTimeLastRunTAS": null,
            "timeTimeLastRunTAS": null,
            "textBestRunTAS": null,
            "timeBestRunTAS": null,
            "nbRunTAS": null
        }
        await bot.basicFunctions.get("userData").write(idUser, newData);
        return newData;
    }
};

module.exports.write = async (idUser, data) => {
    try {
        let donnees = JSON.stringify(data);
        fs.writeFileSync(path + idUser + ".json", donnees);
        return;
    } catch (e) {
        return;
    }
};

module.exports.help = {
    name: "userData"
};