const {
    exec
} = require('child_process');
const config = require('../../config.json');
const idGitChannel = "794860616665137162";


async function pull(bot, GitChannel, terminalChannel) {
    exec('git pull', {
        cwd: config.location
    }, async function (error, stdout, stderr) {
        //console.log(error);
        //console.log(stdout);
        //console.log(stderr);
        const stdoutSplit = stdout.split("\n");
        if (stdoutSplit.length <= 3) {
            if(terminalChannel!=null) terminalChannel.send("```Déjà à jour```").then(async(msg) => {
                await bot.basicFunctions.get("wait").run(30000);
                if(!msg.deleted) msg.delete();
            });
            return;
        }
        let msg = "";
        for (let index = 0; index < stdoutSplit.length; index++) {
            const element = stdoutSplit[index];
            if (msg.length + element.length <= 1900) {
                msg = msg + element + "\n";
            } else {
                GitChannel.send("```" + msg + "```");
                msg = element;
            }
        }
        GitChannel.send("```" + msg + "```");
        if(terminalChannel!=null) terminalChannel.send("```Mise à jour terminé, reboot dans 5s```").then(async(msg) => {
            await bot.basicFunctions.get("wait").run(5000);
            if(!msg.deleted) msg.delete();
        });
        await bot.basicFunctions.get("wait").run(5250);
        bot.destroy();
        await bot.basicFunctions.get("wait").run(5000);
        require('child_process').exec(`node ${config.location}/index.js`, function (msg) {
            console.log(msg)
        });
    });
}

module.exports.run = async (bot, message, args) => {
    message.delete();
    const GitChannel = await bot.channels.fetch(idGitChannel);
    pull(bot, GitChannel, message.channel);
};

module.exports.ready = async (bot) => {
    const GitChannel = await bot.channels.fetch(idGitChannel);
    pull(bot, GitChannel, null);
};

module.exports.help = {
    name: "pull"
};