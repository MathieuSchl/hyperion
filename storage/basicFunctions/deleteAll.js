module.exports.run = async (bot, channel) => {
    channel.bulkDelete(100).catch(() => {});

    await new Promise((resolve, reject) => {
        channel.messages.fetch().then(async (messages) => {
            await bot.basicFunctions.get("wait").run(50);
            messages.array().forEach(msg => {
                try {
                    setTimeout(function () {
                        if (!msg.deleted) msg.delete().catch(() => {});
                    }, 100);
                } catch (error) {
                    console.log("ERROR in delete message catch");
                    console.log(error);
                }
            });
            resolve();
        })
    })
};


module.exports.help = {
    name: "deleteAll"
};