'use strict'

const braveListsLib = require('./lists')

const printReportText = (report, options) => {
  for (const [listUrl, requests] of Object.entries(report.blocked)) {
    const listName = braveListsLib.nameForListUrl(listUrl)
    console.log(listName)
    console.log('---')

    for (const [requestUrl, filterRule] of Object.entries(requests)) {
      if (options.rule === true) {
        console.log(` - ${requestUrl} (${filterRule})`)
      } else {
        console.log(` - ${requestUrl}`)
      }
    }

    console.log('')
  }

  if (options.allowed === true) {
    console.log('not blocked')
    console.log('---')
    for (const requestUrl of report.allowed) {
      console.log(` - ${requestUrl}`)
    }
    console.log('')
  }
}


const printReportJSON = (report, options) => {
  if (options.allowed === true) {
    console.log(JSON.stringify(report))
  } else {
    console.log(JSON.stringify(report.blocked))
  }
}


const printReport = (report, options) => {
  if (options.json === true) {
    printReportJSON(report, options)
  } else {
    printReportText(report, options)
  }
}


module.exports = {
  printReport
}
