'use strict'

const braveListsLib = require('./lists')

const printReport = report => {
  for (const [listUrl, requests] of Object.entries(report)) {
    const listName = braveListsLib.nameForListUrl(listUrl)
    console.log(listName)
    console.log('---')

    for (const [requestUrl, filterRule] of Object.entries(requests)) {
      console.log(` - ${requestUrl} (${filterRule})`)
    }

    console.log('')
  }
}

module.exports = {
  printReport
}
