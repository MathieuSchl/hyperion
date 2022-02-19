const config = require("../storage/config.json");
const fs = require("fs");
const pathSpecialChannels = config.location + "/storage/data/specialChannelList/";
const pathMpChannel = config.location + "/storage/data/DmChannel.json";
const pathSpecialMessages = config.location + "/storage/data/specialMessageList/";

module.exports.run = async (bot) => {
    const allGuilds = bot.guilds.cache.array();

    for (let index = 0; index < allGuilds.length; index++) {
        const element = allGuilds[index];
        if (element.rulesChannelID != null) {
            channel = await bot.channels.fetch(element.rulesChannelID);
            channel.messages.fetch();
        }
    }

    await new Promise((resolve, reject) => {
        fs.readdir(pathSpecialChannels, async function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < files.length; i++) {
                files[i] = files[i].split(".")[0];
            }
            for (let i = 0; i < files.length; i++) {
                await bot.channels.fetch(files[i]).then((channel) => {
                    channel.messages.fetch();
                }).catch(() => {
                    console.log("Channel " + files[i] + " does not exist");
                })
            }
            resolve();
        });
    })

    fichiers = fs.readFileSync(pathMpChannel);
    let donnePath = JSON.parse(fichiers);

    let keys = Object.keys(donnePath);
    for (let theChannel of keys) {
        channel = await bot.channels.fetch(donnePath[theChannel]).then(async function (channel) {
            await channel.messages.fetch();
        }).catch(function (err) {
            console.log("Channel " + theChannel + " does not exist");
        })
    }

    await new Promise((resolve, reject) => {
        fs.readdir(pathSpecialMessages, async function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            for (let i = 0; i < files.length; i++) {
                fichiers = fs.readFileSync(config.location + "/storage/data/specialMessageList/" + files[i]);
                let dataSpecialMessage = JSON.parse(fichiers);

                bot.channels.fetch(dataSpecialMessage.channel).then(async function (channel) {
                    await channel.messages.fetch();
                }).catch(function (err) {
                    console.log("Channel " + dataSpecialMessage.channel + " does not exist");
                })
            }
            resolve();
        });
    })
};


module.exports.help = {
    name: "catchMessageInSpecialChannels"
};