const config = require('../../config.json');
const fs = require("fs");
const idRole = "792128655409020948";//IdRole je l'ai fait


async function meMeastiure(ms) {
    let d, h, m, s;
    s = ms / 1000;
    ms = ms % 1000;
    m = s / 60;
    s = s % 60;
    h = m / 60;
    m = m % 60;
    d = h / 24;
    h = h % 24;

    s = Math.trunc(s);
    m = Math.trunc(m);
    h = Math.trunc(h);
    d = Math.trunc(d);

    return [d, h, m, s, ms];
};

async function timeToString(time) {
    try {
        let d = time[0];
        let h = time[1];
        let m = time[2];
        let s = time[3];
        ms = time[4];

        time = "";
        if (d > 0) {
            time = time + d + "j ";
        }
        if (h > 0) {
            time = time + h + "h ";
        }
        if (m > 0) {
            time = time + m + "m ";
        }
        if (s > 0) {
            time = time + s + "s ";
        }
        if (ms > 0) {
            time = time + ms + "ms";
        }
    } catch (e) {
        time = "ERROR";
    }
    return time;
};


module.exports.run = async (bot, message, teamData) => {
    teamData.endingTime = new Date();
    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

    const time = -(new Date(teamData.startingTime).getTime() - new Date(teamData.endingTime).getTime());
    const textTime = await timeToString(await meMeastiure(time));

    for (let index = 0; index < teamData.players.length; index++) {
        const player = await message.guild.members.fetch(element);
        player.roles.add(idRole).catch(()=>{console.log("le role je l'ai fini n'existe plus")});//donne le rôle je l'ai fini

        const element = teamData.players[index];
        let data = await bot.basicFunctions.get("userData").open(bot, element);

        if (teamData.gameType === "normal" && data.timeFirstTry == null){
            data.timeFirstTry=time;
            data.textFirstTry=textTime;

        }

        await bot.basicFunctions.get("userData").write(element, data);
    }

    return teamData;
}

module.exports.help = {
    name: "uptateDataForGame"
};