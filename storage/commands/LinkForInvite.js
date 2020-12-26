const Discord = require("discord.js");
const config = require("../config.json");
const admin = ["210392675478667269"]

module.exports.run = async (bot, message, args)=>{
    message.delete();
    if (admin.includes(message.author.id)){
        message.channel.send("https://discord.com/oauth2/authorize?client_id=776472377923338248&scope=bot&permissions=603454800")
            .then(msg => {
                msg.delete({ timeout: 10000 })
            });
    }else{
        message.channel.send("<@"+message.author.id+"> tu n'es pas autorisé à faire cela")
            .then(msg => {
                msg.delete({ timeout: 10000 })
            });
    }
};


module.exports.help = {
    name: "link"
};

module.exports.manuel = {
    man: "man permet d'afficher le manuel d'une fonction\n" +
        "Pour ce faire il faut écrire dans le terminal:\n" +
        "`"+config.prefix+" man [nom de la commande]`"
};

module.exports.manuelview = {
    view: false
};