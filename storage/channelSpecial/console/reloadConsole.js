const config = require("../../config.json");
const fs = require("fs");
const path = config.location+"ConsoleFile.txt";
const idChannel = "795218698435690507";


module.exports.run = async (bot) => {
    const channel = await bot.channels.fetch(idChannel);
    await bot.basicFunctions.get("deleteAll").run(bot,channel);

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        
        const dataSplit = data.split("\n");
        let msg = "";
        for (let index = 0; index < dataSplit.length; index++) {
            const element = dataSplit[index];
            if (msg.length + element.length <= 1900) {
                msg = msg + element + "\n";
            } else {
                channel.send("```\n" + msg + "```");
                msg = element;
            }
        }
        channel.send("```\n" + msg + "```");
    });
}

module.exports.help = {
    name: "reloadConsole"
};