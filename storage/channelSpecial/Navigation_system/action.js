const config = require('../../config.json');
const fs = require("fs");
const System = "Navigation_system";
const shipsCoordinates = "Sierra 854 Charlie 190 Yankee 476";

module.exports.run = async (bot, message, teamData) => {
    if (!teamData.data[System]["shipsCoordinates"]) {
        if(message.content==="Sierra 854 Charlie 190 Yankee 476"){
            message.delete().catch();
            message.channel.send("Les coordonnées du vaisseaux sont valides");
            await bot.basicFunctions.get("wait").run(5000);
            message.channel.bulkDelete(100).catch();
            teamData.data[System]["shipsCoordinates"]=true;
            await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
            bot.basicFunctions.get("backButton").run(message);
            bot.specialChannel[System].get("menu").run(bot, message, teamData);
        }else{
            message.delete().catch();
            message.channel.send("Le système de navigation indique que les coordonnées sont invalides").then(msg => {
                setTimeout(() => {
                    msg.delete().catch();
                  }, 5000);
            });
        }
        /*
    }
    else if (!teamData.data[System]["earthCoordinate"]) {
        if(message.content==="Hotel 784 November 286 Papa 715"){
            message.delete().catch();
            message.channel.send("Les coordonnées de la destination sont valides\nDestination: Terre");
            await bot.basicFunctions.get("wait").run(5000);
            message.channel.bulkDelete(100).catch();
            teamData.data[System]["earthCoordinate"]=true;
            await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
            bot.basicFunctions.get("backButton").run(message);
            bot.specialChannel[System].get("menu").run(bot, message, teamData);

   
        }else{
            message.delete().catch();
            message.channel.send("Le système de navigation indique que les coordonnées sont invalides").then(msg => {
                setTimeout(() => {
                    msg.delete().catch();
                  }, 5000);
            });
        }
        */
    } else {
        message.delete();
    }
}

module.exports.help = {
    name: "action"
};