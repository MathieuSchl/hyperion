

module.exports.run = async (bot, playerId, gameId, creation) => {
    let teamData = await bot.basicFunctions.get("teamData").open(gameId);

    teamData.players.push(playerId);

    await bot.basicFunctions.get("teamData").write(gameId,teamData);

    const gameChannel = await bot.channels.fetch(teamData.id);
    const player = await gameChannel.guild.members.fetch(playerId);
    player.roles.add(teamData.role)

    
    if(creation){
        player.user.send(`Vous avez créé la partie \`${teamData.name}\``);
    }else{
        player.user.send(`Vous avez été ajouté dans la partie \`${teamData.name}\``);
    }
}

module.exports.help = {
    name: "addPlayerInTeam"
};