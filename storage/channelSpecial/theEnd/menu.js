const config = require('../../config.json');
const fs = require("fs");
const Discord = require('discord.js');
const System = "Navigation_system";


async function meMeastiure(ms) {
    let d, h, m, s;
    s = ms / 1000;
    ms = ms % 1000;
    m = s / 60;
    s = s % 60;
    h = m / 60;
    m = m % 60;
    d = h / 24;
    h = h % 24;

    s = Math.trunc(s);
    m = Math.trunc(m);
    h = Math.trunc(h);
    d = Math.trunc(d);

    return [-d, -h, -m, -s, -ms];
};

module.exports.run = async (bot, message, teamData) => {
    const winEmbed = new Discord.MessageEmbed()
        .setColor('#28FF00');
    winEmbed.setTitle("Mission accomplie!");
    winEmbed.setTimestamp();
    winEmbed.setDescription("Le vaisseau \"Hyperion\" a entamé son voyage de retour en toute sécurité.\n" +
        "Le vaisseau devrait bientôt atterrir aux coordonnées `N 48°54.897' E 2°8.115'`.\n" +
        "Félicitations votre mission est accomplie");
    message.channel.send(winEmbed);
    await bot.basicFunctions.get("wait").run(20000);

    let startingTime = "";
    try {
        startingTime = new Date(teamData.startingTime);
        startingTime = startingTime.getDate() + "/" + startingTime.getMonth() + "/" + startingTime.getFullYear() + " à " + startingTime.getHours() + ":" + startingTime.getMinutes();
    } catch (e) {
        startingTime = "ERROR";
    }

    let endingTime = "";
    try {
        endingTime = new Date(teamData.endingTime);
        endingTime = endingTime.getDate() + "/" + endingTime.getMonth() + "/" + endingTime.getFullYear() + " à " + endingTime.getHours() + ":" + endingTime.getMinutes();
    } catch (e) {
        endingTime = "ERROR";
    }

    let time = "";
    let ms = "";
    try {
        time = new Date(teamData.startingTime).getTime() - new Date(teamData.endingTime).getTime();

        time = await meMeastiure(time)
        let d = time[0];
        let h = time[1];
        let m = time[2];
        let s = time[3];
        ms = time[4];

        time = "";
        if (d > 0) {
            if (d > 1) {
                time = time + d + " jours ";
            } else {
                time = time + d + " jour ";
            }
        }
        if (h > 0) {
            if (h > 1) {
                time = time + h + " heures ";
            } else {
                time = time + h + " heure ";
            }
        }
        if (m > 0) {
            if (m > 1) {
                time = time + m + " minutes ";
            } else {
                time = time + m + " minute ";
            }
        }
        if (s > 0) {
            if (s > 1) {
                time = time + s + " secondes ";
            } else {
                time = time + s + " seconde ";
            }
        }
    } catch (e) {
        time = "ERROR";
    }

    const scoreEmbed = new Discord.MessageEmbed()
        .setColor('#F4FF00');
    scoreEmbed.setTitle("Statistiques de la partie");
    scoreEmbed.setDescription("```\n" +
        "Vous avez commencé votre partie le " + startingTime + "\n" +
        "Vous avez fini votre partie le " + endingTime + "\n" +
        "La durée totale de votre partie est de : " + time + "\n" +
        "\n```");
    message.channel.send(scoreEmbed);
    await bot.basicFunctions.get("wait").run(20000);



    const creditEmbed = new Discord.MessageEmbed()
        .setColor('#F4FF00');
    creditEmbed.setTitle("Thanks for playing");
    creditEmbed.setDescription("Crédits```\n" +
        "\n```");
    message.channel.send("Merci d'avoir joué 😊");

}

module.exports.help = {
    name: "menu"
};