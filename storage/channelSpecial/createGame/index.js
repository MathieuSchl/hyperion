const { userInfo } = require("os");


module.exports.run = async (bot, message, args) => {
    message.delete();
    //console.log(await bot.basicFunctions.get("checkUserGame").run(bot,message))

    await bot.basicFunctions.get("checkUserGame").run(bot,message,((res)=>{
        if(res){
            message.author.send(`Pour créer une nouvelle partie, vous devez d'abord quitter la partie précédente.\nVous êtes encore dans la partie \`${res}\``)
            return;
        }else{
            let name = args[0];
            for (let i = 1; i < args.length; i++) {
                const element = args[i];
                name = name + " " + element;
            }

            bot.specialChannel.createGame.get("createGame").run(bot,message.guild,name,message.author)
        }
    }))
}

module.exports.help = {
    name: "index"
};