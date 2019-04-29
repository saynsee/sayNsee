const readline = require('readline-sync')

function start() {
  const content = {}

  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()

  function askAndReturnSearchTerm() {
      return readline.question('Type a query word: ')
  }


  function askAndReturnPrefix() {
      const prefixes = ['Who is', 'What is', 'The History of']
      const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')

      return prefixes[selectedPrefixIndex]
  }

  console.log(content)

}
start()
