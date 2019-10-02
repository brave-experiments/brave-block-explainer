#!/usr/bin/env node
'use strict'

const argparseLib = require('argparse')

const braveCrawlLib = require('./brave/crawl')
const braveListsLib = require('./brave/lists')
const braveReportLib = require('./brave/report')

const parser = new argparseLib.ArgumentParser()
parser.addArgument(['-u', '--url'], {
  required: true,
  help: 'The url to determine blocking behavior on'
})
parser.addArgument(['-l', '--lists'], {
  append: true,
  defaultValue: Object.values(braveListsLib.listUrls()),
  help: 'The filter lists to evaluate / match against'
})
parser.addArgument(['-s', '--secs'], {
  defaultValue: 10,
  help: 'Number of seconds to spend on the page'
})
const args = parser.parseArgs();

(async () => {
  const report = await braveCrawlLib.crawl(args)
  braveReportLib.printReport(report)
})()
