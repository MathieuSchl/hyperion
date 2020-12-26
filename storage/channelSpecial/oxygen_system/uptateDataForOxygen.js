const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message, teamData) => {
    if(teamData.data.oxygen_system["dioxygene"]==null){

        teamData.data.oxygen_system["dioxygene"] = 0;
        teamData.data.oxygen_system["diazote"] = 0;
        teamData.data.oxygen_system["dioxyde de carbone"] = 0;
        teamData.data.oxygen_system["temp"] = 0;

        try{
            if(teamData.data.game_event.oxygen===true){
                teamData.data.oxygen_system["reserve"] = 2;
            }else{
                teamData.data.oxygen_system["reserve"] = 11;
            }
        }catch(e){
            teamData.data.oxygen_system["reserve"] = 5;
        }
        
        teamData.data.oxygen_system["oxygene_generator"] = false;
        teamData.data.oxygen_system["ship_temp"] = 21;
        
        await bot.basicFunctions.get("teamData").write(message.channel.id,teamData);
    }

    return teamData;
}

module.exports.help = {
    name: "uptateDataForOxygen"
};