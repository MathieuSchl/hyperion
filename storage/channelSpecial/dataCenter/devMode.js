const {
    exec
} = require('child_process');
const config = require('../../config.json');


module.exports.run = async (bot, message, args) => {
    message.delete();
    exec('git checkout DevMode', {
        cwd: config.location
    }, function (error, stdout, stderr) {
        console.log(error);
        //console.log(stdout);
        console.log(stderr);
        const stdoutSplit = stdout.split("\n")
        let msg = "";
        for (let index = 0; index < stdoutSplit.length; index++) {
            const element = stdoutSplit[index];
            if (msg.length + element.length <= 1900) {
                msg = msg + element + "\n";
            } else {
                message.channel.send("```" + msg + "```");
                msg = element;
            }
        }
        message.channel.send("```" + msg + "```");
    });
};

module.exports.help = {
    name: "devMode"
};