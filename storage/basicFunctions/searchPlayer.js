const config = require('../config.json');
const fs = require("fs");

module.exports.run = async (bot,guild,playerName) => {
    const members = Array.from(guild.members.cache);
    let res = [];
    playerName = playerName.toLowerCase();

    for (let index = 0; index < members.length; index++) {
        const element = members[index][1];
        let isPlayer = false;

        if(element.nickname&&element.nickname.toLowerCase()===playerName) isPlayer=true;
        if(element.user.username.toLowerCase()===playerName) isPlayer=true;
        if(element.user.tag.toLowerCase()===playerName) isPlayer=true;
        
        if(isPlayer) res.push(members[index][0]);
    }
    return res;
}

module.exports.help = {
    name: "searchPlayer"
};