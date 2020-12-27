const { exec } = require('child_process');
const config = require('../../config.json');


module.exports.run = async (bot, message, args) => {
    message.delete();
     exec('git pull', {cwd: config.location}, function (error, stdout, stderr) {
        //console.log(error);
        //console.log(stdout);
        //console.log(stderr);
        message.channel.send("```"+stdout+"```").catch(()=>{message.channel.send("```Une grosse mise à jour a été faite```")});
    });
};

module.exports.help = {
    name: "pull"
};