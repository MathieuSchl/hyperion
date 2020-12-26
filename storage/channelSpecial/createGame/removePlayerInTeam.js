

module.exports.run = async (bot, playerId, gameId, byHost) => {
    let teamData = await bot.basicFunctions.get("teamData").open(gameId);

    
    const indexPlayer = teamData.players.indexOf(playerId)
    teamData.players.splice(indexPlayer,1);

    await bot.basicFunctions.get("teamData").write(gameId,teamData);

    const gameChannel = await bot.channels.fetch(teamData.id);
    const player = await gameChannel.guild.members.fetch(playerId);
    player.roles.remove(teamData.role)

    
    if(byHost===true) player.user.send(`Vous avez été retiré de la partie \`${teamData.name}\``);
    else player.user.send(`Vous avez quitté la partie \`${teamData.name}\``);

    if(teamData.players.length===0) bot.specialChannel.createGame.get("removeGame").run(bot, gameId);

    if(indexPlayer!==0) return;
    if(teamData.players.length===0) return;

    const newHostUser = await gameChannel.guild.members.fetch(teamData.players[0])

    const invitePlayerChannel = await bot.channels.fetch(teamData.invitePlayer)
    const removePlayerChannel = await bot.channels.fetch(teamData.removePlayer)
    
    const permissionsInvite = invitePlayerChannel.permissionOverwrites.get(playerId);
    permissionsInvite.id = teamData.players[0];
    permissionsInvite.update(permissionsInvite);

    const allPermissionsInvite = invitePlayerChannel.permissionOverwrites.filter(o => o.id !== playerId).array();
    invitePlayerChannel.overwritePermissions(allPermissionsInvite);

    
    const permissionsDelete = removePlayerChannel.permissionOverwrites.get(playerId);
    permissionsDelete.id = teamData.players[0];
    permissionsDelete.update(permissionsDelete);

    const allPermissionsDelete = removePlayerChannel.permissionOverwrites.filter(o => o.id !== playerId).array();
    removePlayerChannel.overwritePermissions(allPermissionsDelete);

    newHostUser.send(`Vous êtes le nouveau chef de la partie \`${teamData.name}\`\nVous pouvez inviter d'autres joueur grâce au salon \`inviter-des-joueurs\``);
}

module.exports.help = {
    name: "removePlayerInTeam"
};