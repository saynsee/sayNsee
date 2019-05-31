const fs = require('fs')
const contentFilePath = './content.json'

function load() {
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
    return JSON.parse(fileBuffer)
}

function save(content) {
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(contentFilePath, contentString)
}

module.exports = {
    save,
    load
}
