const { exec } = require('child_process');


module.exports.run = async (bot, message, args) => {
    message.delete();
    message.channel.send("```Redémarage dans 5s```").then((msg) => {
        msg.delete({
            timeout: 5000
        })
    });
    await bot.basicFunctions.get("wait").run(1000);
    exec.exec('ls', function (error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
    });
};

module.exports.help = {
    name: "pull"
};