module.exports.run = async (bot, message, args) => {
    message.delete();

    try {
        let player = message.content;
        player = await bot.basicFunctions.get("searchPlayer").run(bot, message.guild, player);
        if (player.length === 0) {
            message.channel.send("Le joueur `" + message.content + "` n'a pas été trouvé").then((msg) => {
                setTimeout(() => {
                    if (!msg.deleted) msg.delete().catch();
                }, 10000)
            });
            return;
        }
        if (player.length >= 2) {
            message.channel.send("Plusieurs joueurs ont le psudo `" + message.content + "`.\nEssayer de l'écrire avec un \"#\" Ex: `" + bot.user.tag + "`").then((msg) => {
                setTimeout(() => {
                    if (!msg.deleted) msg.delete().catch();
                }, 10000)
            });
            return;
        }


        let teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);
        teamData = await bot.basicFunctions.get("teamData").open(teamData.data.gameId);

        if (!teamData.players.includes(player[0])) {
            message.channel.send("Le joueur `" + message.content + "` n'est pas dans l'équipe").then((msg) => {
                setTimeout(() => {
                    if (!msg.deleted) msg.delete().catch();
                }, 10000)
            });
            return;
        }


        await bot.specialChannel.createGame.get("removePlayerInTeam").run(bot, player[0], teamData.id, true);

        bot.specialChannel.startMenu.get("menu").run(bot, teamData.id);

        message.channel.send("Le joueur `" + message.content + "` a été exclu de l'équipe").then((msg) => {
            setTimeout(() => {
                if (!msg.deleted) msg.delete().catch();
            }, 60000)
        });



    } catch (e) {
        message.channel.send("Le joueur `" + message.content + "` n'a pas été trouvé").then((msg) => {
            setTimeout(() => {
                if (!msg.deleted) msg.delete().catch();
            }, 10000)
        });
        return;
    }
}

module.exports.help = {
    name: "index"
};