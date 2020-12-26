const config = require('../../config.json');
const fs = require("fs");
const Excel = require('exceljs');
const System = "table_de_decryptage";
const agentName = "eisenhauer";
const decal = 2;


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports.run = async (bot, message, teamData) => {
    message.delete();

    let filePath = "";

    if (message.content.toLowerCase() === agentName) {
        filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + message.content + '.xlsx';
        filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_Eisenhauer.xlsx';
    } else {
        const newWorkbook = new Excel.Workbook();
        await newWorkbook.xlsx.readFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage_Initiale.xlsx');

        const worksheet = newWorkbook.getWorksheet('Table');

        let index = [];
        for (let i = 1; i <= 99; i++) {
            index.push(i);
        }

        index = shuffle(index);

        for (let i = 0; i < index.length; i++) {
            let cellB = worksheet.getCell('K' + (i + 1 + decal));
            //console.log(index[i])
            let cellA = worksheet.getCell('J' + (index[i] + decal));
            cellB.value = cellA.value;
        }

        try {
            await newWorkbook.xlsx.writeFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + message.content + '.xlsx');
            filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + message.content + '.xlsx';
        } catch (e) {
            await newWorkbook.xlsx.writeFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage.xlsx');
            filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage.xlsx';
        }
    }

    message.channel.send("Votre table de décrypat", {
        files: [filePath]
    });
    await bot.basicFunctions.get("wait").run(2000);
    try {
        if (message.content.toLowerCase() !== agentName) fs.unlinkSync(filePath);
        //file removed
    } catch (err) {
        console.error(err)
    }
}

module.exports.help = {
    name: "action"
};