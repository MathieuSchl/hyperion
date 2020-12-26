

module.exports.run = async (bot, reaction, user, action, dataSpecialMessage) => {
    bot.specialChannel.createGame.get("removePlayerInTeam").run(bot, user.id, dataSpecialMessage.data.gameId);
    await bot.basicFunctions.get("wait").run(5000);
    let teamData = await bot.basicFunctions.get("teamData").open(reaction.message.channel.id);
    if(teamData.type==="startGame") bot.specialChannel.startMenu.get("menu").run(bot, teamData.id);
}

module.exports.help = {
    name: "index"
};