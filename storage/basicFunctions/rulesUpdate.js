const Discord = require('discord.js');
const config = require('../config.json');
const fs = require("fs");


async function getRules(bot) {
    const rulesEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Règlement du serveur `' + (await bot.guilds.fetch("786341813530656828")).name + '`')
        .addFields({
            name: 'Préambule',
            value: 'En utilisant le serveur `' + (await bot.guilds.fetch("786341813530656828")).name + '`, vous vous engagez à respecter les règles ci-dessous. Les modérateurs de ce Discord se résevent le droits de sanctionner les personnes qui ne respecteraient pas le règlement.'
        },{
            name: 'Respect des personnes',
            value: 'Il est primordial de respecter les autres personnes dans les channels textuels et vocaux. Aucun propos haineux, menaçant, diffamatoire, de harcèlement ou tout simplement offensant envers une autre personne ne sera toléré.'
        },{
            name: 'Pas SPAM',
            value: 'Le spam dans les channels textuels, vocal et par MP n’est pas toléré.'
        },{
            name: 'AFK',
            value: 'Merci de ne pas rester AFK dans les salons vocaux ouvert à tous. Un salon AFK à été créé pour cela (il porte bien son nom 🙂)'
        },{
            name: 'Pas de Pub',
            value: 'Il est interdit de faire de la Pub pour d\'autres serveurs discord/services/produits. Ce serveur n\'est pas fait pour ca'
        },{
            name: 'But des salon',
            value: 'Merci de respecter les buts des salons. Ce serveur comporte des channels NO-SPOIL et des channels SPOIL (débloqué après avoir terminé aux moins une fois l\'escape). Tout message contenant un spoiler posté sur un channel NO-SPOIL sera sanctionné.\nPour le channel <#792132703742066688> merci d\nutiliser la commande `/spoiler`'
        },{
            name: 'Données du serveur',
            value: 'Le serveur avec le bot <@776472377923338248> sauvegarde des données. Ces données sont de trois types:\n-Donnée générales du jeu (ex:Nombres total de parties joué, meilleur temps,...)\n-Données de parties (données qui permettent de sauvegarder la progression de la partie)\n-Données de joueurs (temps de votre première partie, meilleurs temps SpeedRun, nombre total de Run)'
        });

    return rulesEmbed;
}

async function getCheckRules() {
    const checkRulesEmbed = new Discord.MessageEmbed()
        .setColor('#28FF5E')
        .setTitle('ACCEPTER LE REGLEMENT')
        .setDescription('Pour certifier que vous avez lu et que vous approuvez le règlement et le système de gestion des données, merci de réagir avec ✅ ci-dessous');

    return checkRulesEmbed;
}

module.exports.run = async (bot) => {
    const channel = await bot.channels.fetch("787758740052115456");
    const messages = (await channel.messages.fetch()).array();

    messages[0].edit(await getCheckRules())
    messages[1].edit(await getRules(bot))
}

module.exports.help = {
    name: "rulesUpdate"
};