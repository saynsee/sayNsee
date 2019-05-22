const fs = require('fs')
const contentFilePath = './content.json'



function save(content) {
    const contentString = JSON.stringify(content)

    // saves the string in disc, synchronously, in 'contentFilePath', right in the root of the Project
    return fs.writeFileSync(contentFilePath, contentString)
}



function load() {
    // reads the file and loads it to this buffer
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')

    // JSON.parse turns the file right back into 'javascript object'
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}



// exports both the methods, to be used anywhere
module.exports = {
    save,
    load
}
