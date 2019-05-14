const readline = require('readline-sync')
const robots = {
    text: require('./robots/text.js')
}


async function start() {
  const content = {
      maximumSentences: 7,
  }


  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()
  await robots.text(content)

  function askAndReturnSearchTerm() {
      return readline.question('Type a query word: ')
  }

  function askAndReturnPrefix() {
      const prefixes = ['Who is', 'What is', 'The History of']
      const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose an option: ')
      const selectedPrefixText = prefixes[selectedPrefixIndex]
      return selectedPrefixText
  }

   console.log(JSON.stringify(content, null, 10))
  //console.log(content)

}
start()
