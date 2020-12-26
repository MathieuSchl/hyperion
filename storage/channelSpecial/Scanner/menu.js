const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "Navigation_system";

module.exports.run = async (bot, message, teamData) => {
    message.channel.send("```Veuillez entrer le nom de la case pour scanner la région\nExemple: \"A1\"\nInformations pratiques: Le scan d'une région prends environ 10s\n                        Le scanneur met environ 20s pour être à nouveau opérationnel\n                        Il est fortement conseillé d'utiliser la carte avec le scanner```")
}

module.exports.help = {
    name: "menu"
};