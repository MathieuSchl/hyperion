const config = require('../../config.json');
const fs = require("fs");
const Excel = require('exceljs');
const System = "table_de_decryptage";
const agentName = "eisenhauer";
const decal = 5;
const columnLength = 33;


async function createPdf(bot, filePath, pdfPath) {
    const tocken = await bot.basicFunctions.get("getApiConvertKey").getkey();
    if (tocken == null) return false;
    const convertapi = require('convertapi')(tocken);

    try {
        await convertapi.convert('pdf', {
                File: filePath
            })
            .then(function (result) {
                // save to file
                return result.file.save(pdfPath);
            });
    } catch (e) {
        return false;
    }
    return true;
}

async function getCellName(cell, valueColumn) {
    let column = Math.trunc(cell / columnLength);
    const line = (cell % columnLength) + decal;

    switch (column) {
        case 0:
            if (valueColumn) {
                column = "B"
            } else {
                column = "C"
            }
            break;
        case 1:
            if (valueColumn) {
                column = "E"
            } else {
                column = "F"
            }
            break;
        case 2:
            if (valueColumn) {
                column = "H"
            } else {
                column = "I"
            }
            break;
        default:
            column = "ERROR"
    }
    return column + line;
}

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
    let pdfPath = "";
    let res = true;
    const tableName = message.content.toLowerCase();

    if (tableName === agentName) {
        pdfPath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_Eisenhauer.pdf';
        await bot.basicFunctions.get("wait").run(5000);
    } else {
        const newWorkbook = new Excel.Workbook();
        await newWorkbook.xlsx.readFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage_Initiale.xlsx');

        const worksheet = newWorkbook.getWorksheet('Table');

        let index = [];
        for (let i = 0; i <= 98; i++) {
            index.push(i);
        }

        index = shuffle(index);

        for (let i = 0; i < index.length; i++) {
            //console.log(await getCellName(i, false));
            let cellB = worksheet.getCell(await getCellName(i, false));
            //console.log(await getCellName(index[i], true));
            let cellA = worksheet.getCell(await getCellName(index[i], true));
            cellB.value = cellA.value;
        }

        try {
            await newWorkbook.xlsx.writeFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + tableName + '.xlsx');
            filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + tableName + '.xlsx';
        } catch (e) {
            await newWorkbook.xlsx.writeFile(config.location + 'storage/table_de_decryptage/Table_de_decryptage.xlsx');
            filePath = config.location + 'storage/table_de_decryptage/Table_de_decryptage.xlsx';
        }

        pdfPath = config.location + 'storage/table_de_decryptage/Table_de_decryptage_' + tableName + '.pdf';
        res = await createPdf(bot, filePath, pdfPath);
    }

    if (res) {
        message.channel.send("Votre table de décryptage", {
            files: [pdfPath]
        });
    } else {
        message.channel.send("Votre table de décryptage.\nIl y a un problème pour la conversion du fichier en pdf. Le fichier est donc uniquement disponible en .xlsx.\nVeillez-nous excuser pour la gêne occasionnée", {
            files: [filePath]
        });
    }

    await bot.basicFunctions.get("wait").run(2000);
    try {
        if (tableName !== agentName) {
            fs.unlinkSync(filePath);
            fs.unlinkSync(pdfPath);
        }
        //file removed
    } catch (err) {
        console.error(err)
    }
}

module.exports.help = {
    name: "action"
};