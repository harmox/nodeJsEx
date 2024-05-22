const fs = require(`fs`).promises
const path = require(`path`)

async function readFile(filePath) {
    return fs.readFile(path.join(__dirname, filePath), 'utf-8');
}
async function writeFile(filePath, data) {
    return fs.writeFile(path.join(__dirname, filePath), JSON.stringify(data));
}

module.exports = {
    readFile,writeFile
}