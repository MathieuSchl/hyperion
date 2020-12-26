const Discord = require("discord.js");
const config = require("./storage/config.json");

module.exports.run = async () => {
    const bot = new Discord.Client();

    bot.on("ready", async () => {
        try {
            bot.enventIndex.get("ready").run(bot);
        } catch (e) {
            console.log("Error in the ready event\n---------\n");
            console.log(e);
            console.log("\n\n")
        }
    });

    bot.on("message", message => {
        try {
            bot.enventIndex.get("messages").run(bot, message);
        } catch (e) {
            console.log("Error in the message event\n---------\n");
            console.log(e);
            console.log("\n\n")
        }
    });

    bot.on('messageReactionAdd', (reaction, user) => {
        try {
            bot.enventIndex.get("reaction").addReaction(bot, reaction, user);
        } catch (e) {
            console.log("Error in the messageReactionAdd event\n---------\n");
            console.log(e);
            console.log("\n\n")
        }
    });

    bot.on('messageReactionRemove', (reaction, user) => {
        try {
            bot.enventIndex.get("reaction").removeReaction(bot, reaction, user);
        } catch (e) {
            console.log("Error in the messageReactionRemove event\n---------\n");
            console.log(e);
            console.log("\n\n")
        }
    });

    async function start() {
        try {
            await require("./enventIndex/scanCommands.js").run(bot);
        } catch (e) {
            console.log(e)
        }
        try {
            setTimeout(function () {
                bot.login(config.token).catch((e) => {
                    console.log()
                    console.log("ERROR : connexion non établie")
                });
            }, config.waitForLog);
        } catch (e) {}

    }

    start();
}