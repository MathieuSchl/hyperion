

async function getMessageAfterNuke(bot) {
    mess = "Pour créer une partie, un joueur doit écrire le nom de l'équipe dans ce channel\n"+
           "Ce joueur doit par la suite inviter les autres joueurs dans le salon \"inviter-des-joueurs\"";
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
        await message.channel.send(await getMessageAfterNuke(bot)).then((msg) => {
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