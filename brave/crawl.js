'use strict'

const adBlockRsLib = require('adblock-rs')
const puppeteerLib = require('puppeteer')

const listsLib = require('./lists')

const onRequestCallback = async (blockReport, adBlockEngines, request) => {
  const frame = request.frame()
  if (frame === null) {
    return
  }

  const requestUrl = request.url()
  const frameUrl = frame.url()
  const requestType = request.resourceType()

  for (const [listUrl, engine] of Object.entries(adBlockEngines)) {
    const matchResult = engine.check(requestUrl, frameUrl, requestType, true)
    if (matchResult.matched) {
      blockReport.blocked[listUrl][requestUrl] = matchResult.filter
      return
    }
  }

  blockReport.allowed.push(requestUrl)
}

const crawl = async args => {
  const adBlockArgs = {
    debug: true,
    optimize: false
  }

  const adBlockEngines = Object.create(null)
  const blockReport = {
    blocked: {},
    allowed: []
  }

  for (const listUrl of args.lists) {
    const filterListText = await listsLib.getListContent(listUrl, args)
    const filterListRules = filterListText.split('\n')
    const adBlockEngine = new adBlockRsLib.Engine(filterListRules, adBlockArgs)
    adBlockEngines[listUrl] = adBlockEngine
    blockReport.blocked[listUrl] = {}
  }

  const onRequestFunc = onRequestCallback.bind(undefined, blockReport, adBlockEngines)

  const browser = await puppeteerLib.launch()
  const page = await browser.newPage()
  page.on('request', onRequestFunc)

  const waitTime = args.secs
  const startTime = Date.now()
  try {
    await page.goto(args.url)
  } catch (e) {
    if ((e instanceof puppeteerLib.errors.TimeoutError) === false) {
      console.log(`Error doing top level fetch: ${e.toString()}`)
      return
    }
  }
  const endTime = Date.now()
  const timeElapsed = endTime - startTime

  if (timeElapsed < waitTime) {
    const additionalWaitTime = waitTime - timeElapsed
    await page.waitFor(additionalWaitTime)
  }

  page.removeListener('request', onRequestFunc)
  await browser.close()
  return blockReport
}

module.exports = {
  crawl
}
