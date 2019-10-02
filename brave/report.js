'use strict'

const braveListsLib = require('./lists')

const printReport = (report, printRule = false) => {
  for (const [listUrl, requests] of Object.entries(report)) {
    const listName = braveListsLib.nameForListUrl(listUrl)
    console.log(listName)
    console.log('---')

    for (const [requestUrl, filterRule] of Object.entries(requests)) {
      if (printRule) {
        console.log(` - ${requestUrl} (${filterRule})`)
      } else {
        console.log(` - ${requestUrl}`)
      }
    }

    console.log('')
  }
}

module.exports = {
  printReport
}
