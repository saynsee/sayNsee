const readline = require('readline-sync')
const keywordExtractor = require("keyword-extractor")
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('./credentials/google-search.json')
const state = require('./robots/state.js')

async function robot() {
    const content = {}
    content.input = readline.question('Digite uma frase significativa ' +
        'do seu dia, da sua semana ou da sua vida: ')
    content.searchTags = keywordExtractor.extract(content.input,
        {
            language:"portuguese",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false
        })

    const workObjects = []

    for (const index in content.searchTags) {
        const searchTag = content.searchTags[index]
        const url = await fetchGoogleAndReturnImagesLinks(searchTag)
        workObjects[index] = {
             keyword : searchTag ,
             url : url
        }

    }
    content.workObjects = workObjects

    console.log(`content:  ${JSON.stringify(content)}`)

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 1
        })

        const imagesUrl = response.data.items.map((item) => {
            return item.link
        })
        return imagesUrl[0]
    }

}
robot()
