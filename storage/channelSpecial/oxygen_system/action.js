const config = require('../../config.json');
const fs = require("fs");

module.exports.run = async (bot, message, teamData) => {
    message.delete();

    if(teamData.data.oxygen_system.statusActivation!=null && teamData.data.oxygen_system.statusActivation!==0){
        bot.specialChannel.oxygen_system.get("changeData").newVal(bot, message, teamData);
    }
}

module.exports.help = {
    name: "action"
};