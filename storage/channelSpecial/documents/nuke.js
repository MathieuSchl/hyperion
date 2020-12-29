const config = require('../../config.json');
const filePath = config.location + 'storage/channelSpecial/documents/Introduction_et_commandes.pdf';


async function getMessageAfterNuke(bot) {
    mess = "Durant la partie, il est recommandé d'avoir ce document à porté de main\n" +
        "Il peut toujours servir 😉";
    return mess;
}

module.exports.run = async (bot, message, args) => {
    const member = await message.guild.members.fetch(message.author.id);
    if (!member.hasPermission("ADMINISTRATOR")) {
        message.delete().catch();
        //message.reply("tu n'est pas autorisé à utiliser cette commande")
        return;
    }

    message.channel.messages.fetch().then(async (messages) => {
        await messages.array().reverse().forEach(msg => {
            msg.delete().catch(() => {});
        });
        await message.channel.send(await getMessageAfterNuke(bot), {
            files: [filePath]
        }).then((msg) => {
            msg.pin();
        })
        await bot.basicFunctions.get("wait").run(250);
        message.channel.lastMessage.delete().catch(() => {});
    })
    return;
}

module.exports.help = {
    name: "nuke"
};