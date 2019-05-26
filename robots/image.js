const imageDownloader = require('image-downloader')
const state = require('./state.js')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../credentials/google-search.json')


async function robot() {
    const content = state.load()

    await fetchImagesOfAllSentences(content)
    await downloadAllImages(content)
    state.save(content)

    async function fetchImagesOfAllSentences(content) {
        for (const sentence of content.sentences) {
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
            sentence.images = await fetchGoogleAndReturnImagesLinks(query)

            sentence.googleSearchQuery = query
        }
    }

    async function fetchGoogleAndReturnImagesLinks(query) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 2
        })
        const imagesUrl = response.data.items.map((item) => {
            return item.link
        })
        return imagesUrl
    }

    async function downloadAllImages(content) {
        content.downloadedImages = []

        for (let sentenceIndex in content.sentences) {
            const images = content.sentences[sentenceIndex].images

            for (let imageIndex in images) {
                const imageUrl = images[imageIndex]

                try {
                    if (content.downloadedImages.includes(imageUrl)) {
                        throw new Error('Image already downloaded')
                    }

                    await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
                    content.downloadedImages.push(imageUrl)
                    console.log(`>[${sentenceIndex}][${imageIndex}] Image downloaded successfully: ${imageUrl}`)
                    break
                } catch(error) {
                    console.log(`>[${sentenceIndex}][${imageIndex}] Error downloading (${imageUrl}): ${error}`)
                }
            }
        }
    }

    async function downloadAndSave(url, fileName) {
        return imageDownloader.image({
            url: url,
            dest: `./content/${fileName}`
        })

    }

}
module.exports = robot
