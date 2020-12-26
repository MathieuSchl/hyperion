

async function getRoleId(guild,name){
    const roles = guild.roles.cache.array();
    for (let index = 0; index < roles.length; index++) {
        const element = roles[index];
        if(element.name===name) return element.id;
    }
    return null;
}

module.exports.run = async (bot, reaction, user, action) => {
    const guildMember = await reaction.message.guild.members.fetch(user.id);
    const roleId = await getRoleId(reaction.message.guild,"✅");
    if(action==="add"){
        guildMember.roles.add(roleId);
    }else if(action==="remove"){
        guildMember.roles.remove(roleId);
    }else{
        return;
    }
}

module.exports.help = {
    name: "index"
};