const config = require('../../config.json');
const fs = require("fs");
const path = config.location + "/storage/data/specialChannelList/";
const pathDm = config.location + "/storage/data/DmChannel.json";
const pathElectricalGame = config.location + "/storage/channelSpecial/Electrical/electricalGame.json";
const system = "Electrical";







async function cleanChannel(messages, correct) {
    if (correct) {
        for (let i = 0; i < messages.length; i++) {
            if(messages.length - 1 !== i) messages[i][1].delete();
        }
    } else {
        if (Array.from(messages[0][1].reactions.cache).length === 0) messages[0][1].delete();
    }
    return;
}

async function generateRessMess(bot, score, teamData) {
    let fichiers = fs.readFileSync(pathElectricalGame);
    let dmData = JSON.parse(fichiers);

    let resMess = "Ce système est alimenté avec " + score + " unités d'énergie\n";
    let correct = false;
    if (teamData.data[system].systemActive === "Reactor") {
        let finalValue = dmData["Reactor"].end;
        if (score === finalValue) {
            resMess = resMess + "Le module \"réacteur\" est maintenant resynchronisé\nPour l'activer revenez sur le channel <#" + teamData.id + ">";
            correct = true;
            teamData.data[system]["reactor"] = true;
            await bot.basicFunctions.get("teamData").write(teamData.id, teamData);
        } else {
            resMess = resMess + "Le module \"réacteur\" n'est pas correctement allimenté";
        }

    } else if (teamData.data[system].systemActive === "Oxygen") {
        let finalValue = dmData["Oxygen"].end;
        if (score === finalValue) {
            resMess = resMess + "Le module oxygène est maintenant resynchronisé\nPour l'activer revenez sur le channel <#" + teamData.id + ">";
            correct = true;
            teamData.data[system]["oxygen"] = true;
            await bot.basicFunctions.get("teamData").write(teamData.id, teamData);
        } else {
            resMess = resMess + "Le module d'oxygène n'est pas correctement allimenté";
        }

    } else if (teamData.data[system].systemActive === "Navigation") {
        let finalValue = dmData["Navigation"].end;
        if (score === finalValue) {
            resMess = resMess + "Le module de navigation est maintenant resynchronisé\nPour l'activer revenez sur le channel <#" + teamData.id + ">";
            correct = true;
            teamData.data[system]["navigation"] = true;
            await bot.basicFunctions.get("teamData").write(teamData.id, teamData);
        } else {
            resMess = resMess + "Le module de navigation n'est pas correctement allimenté";
        }
    }
    return [correct, resMess];
}

async function suite(bot, dmData, teamData) {
    let players = teamData.players;
    let value = [];

    for (let i = 0; i < players.length; i++) {
        let dmChannel = await bot.channels.fetch(dmData[players[i]]);
        await dmChannel.messages.fetch().then(async messages => {
            messages = Array.from(messages);
            for (let j = 0; j < messages.length; j++) {
                let reactions = Array.from(messages[j][1].reactions.cache)
                if (reactions.length !== 0) {
                    for (let k = 0; k < reactions.length; k++) {
                        if (reactions[k][1]["_emoji"].name !== "☑️" && reactions[k][1].count > 1) {
                            value.push(reactions[k][1]["_emoji"].name);
                        }
                    }
                }
            };
        });
        await bot.basicFunctions.get("wait").run(250);
    }

    let score = 0;

    for (let element of value) {
        let sign = element[0];
        let number = "";
        for (let i = 1; i < element.length; i++) {
            number = number + element[i];
        }
        if (sign === "m") {
            score = score + (parseInt(number, 10) * -1);
        } else if (sign === "p") {
            score = score + parseInt(number, 10);
        }
    }

    let res = await generateRessMess(bot, score, teamData);
    let correct = res[0];
    let resMess = res[1];

    for (let i = 0; i < players.length; i++) {
        let channel = await bot.channels.fetch(dmData[players[i]]);
        let messages = Array.from(await channel.messages.fetch());
        await cleanChannel(messages, correct);
        channel.send(resMess);
    }

    if (!correct) return;

    let gameMess = "";
    let gameChannel = await bot.channels.fetch(teamData.id);
    let chatChannel = await bot.channels.fetch(teamData.chat);
    if (teamData.data[system].systemActive === "Reactor") {
        gameMess = "Pour activer le réacteur cliquez sur ✅";
        chatChannel.send("",{files: [
            config.location+"/storage/channelSpecial/game/file/dixJaune.png"
          ]})
    } else if (teamData.data[system].systemActive === "Oxygen") {
        gameMess = "Pour activer le système à oxygène cliquez sur ✅";
        chatChannel.send("",{files: [
            config.location+"/storage/channelSpecial/game/file/unBlanc.png"
          ]})
    } else if (teamData.data[system].systemActive === "Navigation") {
        gameMess = "Pour activer le système de navigation sur ✅";
    }
    gameChannel.send(gameMess).then(msg => {
        msg.react("✅");
    });
}

module.exports.run = async (bot, message) => {
    let fichiers = fs.readFileSync(pathDm);
    let dmData = JSON.parse(fichiers);
    let dmDataKeys = Object.keys(dmData);

    let player;
    for (let i = 0; i < dmDataKeys.length; i++) {
        if (dmData[dmDataKeys[i]] === message.channel.id) player = dmDataKeys[i];
    }
    fs.readdir(path, async function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < files.length; i++) {
            fichiers = fs.readFileSync(path + files[i]);
            let data = JSON.parse(fichiers);

            if (data.players != null && data.players.includes(player)) {
                suite(bot, dmData, data);
                return;
            }
        }
    });
    return

    let messages = await message.channel.messages.fetch().then(messages => {
        return messages
    });
    messages = Array.from(messages);
    let trueMessage = messages[1][1];

    let reactions = Array.from(trueMessage.reactions.cache);
    let value = [];

    for (let i = 0; i < reactions.length; i++) {
        usersFromTheReactions = await trueMessage.reactions.cache.get(reactions[i][1]["_emoji"].id).users.fetch();
        if (Array.from(usersFromTheReactions).length >= 2) {
            value.push(reactions[i][1]["_emoji"].name)
        }
    }

    let score = 0;

    for (let element of value) {
        let sign = element[0];
        let number = "";
        for (let i = 1; i < element.length; i++) {
            number = number + element[i];
        }
        if (sign === "m") {
            score = score + (parseInt(number, 10) * -1);
        } else if (sign === "p") {
            score = score + parseInt(number, 10);
        }
    }
}

module.exports.help = {
    name: "validation"
};