const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require("fs");


module.exports.run = async (bot, message, args)=>{
    message.delete();
    message.channel.send("```Redémarage dans 5s```").then((msg)=>{msg.delete({ timeout:5000 })});
    await bot.basicFunctions.get("wait").run(5250);
    require('child_process').exec('sudo /sbin/shutdown -r now', function (msg) { console.log(msg) });
};

module.exports.help = {
    name: "reboot"
};

