const config = require('../../config.json');
const fs = require("fs");
const System = "Scanner";

module.exports.run = async (bot, message, teamData) => {
    message.delete();
    let now = new Date();
    let scannerReady = new Date(teamData.data[System]["scannerReady"]);

    if ((now - scannerReady) < 0) {
        message.channel.send("Le scanner est en cours de rechargement, veuillez attendre que ce message disparaisse pour l'utiliser à nouveau").then(msg => {
            setTimeout(function () {
                if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
            }, (now - scannerReady) * -1);
        })
        return;
    }

    let wrongFormat = false;
    let lettersList = ["A", "B", "C", "D", "E", "F", "G", "H"]

    if (message.content.length != 2) wrongFormat = true;
    if (!lettersList.includes(message.content[0].toUpperCase())) wrongFormat = true;
    if (isNaN(parseInt(message.content[1], 10)) || parseInt(message.content[1], 10) < 1 || parseInt(message.content[1], 10) > 8) wrongFormat = true;

    if (wrongFormat) {
        message.channel.send("La région \"" + message.content + "\" n'existe pas\nVeuillez entrer une région composé d'une lettre et d'un chiffre\nExemple:A1").then(msg => {
            setTimeout(function () {
                if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
            }, 10000);
        })
        return;
    }

    teamData.data[System]["scannerReady"] = new Date(new Date().getTime() + (1000 * 30));
    await bot.basicFunctions.get("teamData").write(message.channel.id, teamData);

    let mess = "";
    let selectedBox = message.content[0].toUpperCase() + message.content[1];

    switch (selectedBox) {
        case 'D1':
            mess = "L'objet \"Planète Kaldir\" est détecté dans la région " + selectedBox + " aux coordonnées \"Tango 125 Foxrot 719 romeo 791\"";
            break;
        case 'G1':
            mess = "L'objet \"Débris spatiaux\" est détecté dans la région " + selectedBox + " aux coordonnées \"Hotel 291 Kilo 167 Delta 075\"";
            break;
        case 'B2':
            mess = "L'objet \"Astéroïdes\" est détecté dans la région " + selectedBox + " aux coordonnées \"Lima 576 Golf 337 Zulu 351\"";
            break;
        case 'G2':
            mess = "L'objet \"Comète\" est détecté dans la région " + selectedBox + " aux coordonnées \"Uniform 348 Bravo 674 Delta 457\"";
            break;
        case 'C3':
            mess = "L'objet \"Trou noir\" est détecté dans la région " + selectedBox + " aux coordonnées \"Kilo 789 Yankee 716 Papa 228\"";
            break;
        case 'E3':
            mess = "L'objet \"Astéroïdes\" est détecté dans la région " + selectedBox + " aux coordonnées \"Oscar 719 Juliet 971 Victor 887\"";
            break;
        case 'B4':
            mess = "L'objet \"Etoile Tarsonis\" est détecté dans la région " + selectedBox + " aux coordonnées \"X-ray 749 Kilo 256 Papa 716\"";
            break;
        case 'F4':
            mess = "L'objet \"Débris spatiaux\" est détecté dans la région " + selectedBox + " aux coordonnées \"Golf 719 India 193 Mike 719\"";
            break;
        case 'B5':
            mess = "L'objet \"Comète\" est détecté dans la région " + selectedBox + " aux coordonnées \"Echo 716 Sierra 246 Foxtrot 456\"";
            break;
        case 'E5':
            mess = "L'objet \"Planète Valhalla\" est détecté dans la région " + selectedBox + " aux coordonnées \"Foxtrot 186 Sierra 153 Mike 468\"";
            break;
        case 'H5':
            mess = "L'objet \"Etoile Tosh\" est détecté dans la région " + selectedBox + " aux coordonnées \"Idia 456 Zulu 876 November 564\"";
            break;
        case 'C6':
            mess = "L'objet \"Astéroïdes\" est détecté dans la région " + selectedBox + " aux coordonnées \"Oscar 492 India 348 Papa 846\"";
            break;
        case 'G6':
            mess = "L'objet \"Astéroïdes\" est détecté dans la région " + selectedBox + " aux coordonnées \"Uniform 486 November 535 Romeo 428\"";
            break;
        case 'B7':
            mess = "L'objet \"Planète Mustafar\" est détecté dans la région " + selectedBox + " aux coordonnées \"Golf 453 India 678 Kilo 566\"";
            break;
        case 'E7':
            mess = "L'objet \"Comète\" est détecté dans la région " + selectedBox + " aux coordonnées \"Yankee 168 Lima 654 Oscar 531\"";
            break;
        case 'F8':
            mess = "L'objet \"Trou noir\" est détecté dans la région " + selectedBox + " aux coordonnées \"Oscar 879 Sierra 628 November 648 Victor 546\"";
            break;
        case 'A8':
            mess = "L'objet \"Débris spatiaux\" est détecté dans la région " + selectedBox + " aux coordonnées \"Uniform 678 November 435 X-ray 276\"";
            break;
        case 'B6':
            mess = "L'objet \"Hyperion\" est détecté dans la région " + selectedBox + " aux coordonnées \"Sierra 854 Charlie 190 Yankee 476\"";
            break;
        default:
            mess = "La région " + selectedBox + " est vide";
    }

    message.channel.send("Le scan est en cours veuillez patienter").then(msg => {
        setTimeout(function () {
            if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
        }, 10000);
    })

    await bot.basicFunctions.get("wait").run(10000);
    teamData = await bot.basicFunctions.get("teamData").open(message.channel.id);

    if (teamData.type !== "Scanner") return;

    message.channel.send("```" + mess + "```");


    message.channel.send("Le scanner est en cour de rechargement, veuillez attendre que ce message disparaisse pour l'utiliser à nouveau").then(msg => {
        setTimeout(function () {
            if (!msg.deleted) msg.delete().catch("Erreur delete message is string");
        }, 20000);
    })
}

module.exports.help = {
    name: "action"
};