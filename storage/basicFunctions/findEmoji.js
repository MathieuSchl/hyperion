

module.exports.run = async (guild,emojiName)=>{
    let emojis = Array.from(guild.emojis.cache);
    for(let i=0; i<emojis.length;i++){
        if(emojis[i][1].name===emojiName) return emojis[i][1];
    }
    console.log("L'emoji \""+emojiName+"\" n'existe pas")
    return null
};

module.exports.help = {
    name: "findEmoji"
};