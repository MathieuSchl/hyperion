const config = require('../../config.json');
const fs = require("fs");
const System = "Electrical";

module.exports.run = async (bot, message, teamData) => {
    message.delete();
}

module.exports.help = {
    name: "action"
};