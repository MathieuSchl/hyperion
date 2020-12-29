const { userInfo } = require("os");


module.exports.run = async (bot, message, args) => {
    message.delete();
    //console.log(await bot.basicFunctions.get("checkUserGame").run(bot,message))
    if(message.content==="nuke"){
        bot.specialChannel.createGame.get("nuke").run(bot,message,null);
        return;
    }
}

module.exports.help = {
    name: "index"
};