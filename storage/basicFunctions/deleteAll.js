module.exports.run = async (bot, channel) => {
    channel.bulkDelete(100).catch(() => {});
    channel.messages.fetch().then(messages => {
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
    })
};


module.exports.help = {
    name: "deleteAll"
};