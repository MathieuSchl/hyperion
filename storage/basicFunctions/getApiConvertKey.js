const config = require("../config.json");
const fs = require("fs");
const path = config.location + "/storage/data/apiConverterKeys.json";

async function deleteKey(dataKeys) {
    dataKeys.keyList.splice(0, 1);

    let donnees = JSON.stringify(dataKeys);
    fs.writeFileSync(path, donnees);
    return dataKeys;
}

wait = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

getTheKey = async () => {
    fichiers = fs.readFileSync(path);
    let dataKeys = JSON.parse(fichiers);
    try{
        if (dataKeys.keyList.length === 0) return null;
        const convertapi = require('convertapi')(dataKeys.keyList[0].key);
    
        if ((await convertapi.getUser()).SecondsLeft < 15) {
            await deleteKey(dataKeys);
            await wait(100);
            return await getTheKey();
        }
    
        return dataKeys.keyList[0].key;
    }catch(e){
        await deleteKey(dataKeys);
        await wait(100);
        return await getTheKey();
    }
}

module.exports.getkey = async () => {
    return await getTheKey();
}


module.exports.help = {
    name: "getApiConvertKey"
};

//https://emailfake.com/ericreyess.com/jeanmichelDab
//https://github.com/join?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home