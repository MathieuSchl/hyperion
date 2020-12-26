const config = require('../config.json');
const fs = require("fs");

module.exports.run = async (message) => {
    message.channel.bulkDelete(100);
    await message.channel.send("Pour revenir en arrière cliquez sur ↩️\n\n")
        .then(msg => {
            msg.react("↩️");
        });
    return;
}

module.exports.help = {
    name: "backButton"
};