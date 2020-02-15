'use strict'

const cryptoLib = require('crypto')
const fsLib = require('fs')
const pathLib = require('path')
const utilLib = require('util')

const fsReadFilePromise = utilLib.promisify(fsLib.readFile)
const fsSyncPromise = utilLib.promisify(fsLib.stat)
const fsWriteFilePromise = utilLib.promisify(fsLib.writeFile)

const requestPromiseLib = require('request-promise')

const _listNamesToUrls = Object.freeze({
  EasyList: 'https://easylist.to/easylist/easylist.txt',
  EasyPrivacy: 'https://easylist.to/easylist/easyprivacy.txt',
  'uBlock Unbreak': 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  'uBlockOrigin Filters': 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'uBlock filters – Privacy': 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
  'Brave Unbreak': 'https://raw.githubusercontent.com/brave/adblock-lists/master/brave-unbreak.txt',
  'NoCoin Filter List': 'https://raw.githubusercontent.com/brave/adblock-lists/master/coin-miners.txt',
  'Disconnect rules': 'https://raw.githubusercontent.com/brave/adblock-lists/master/brave-disconnect.txt',
  'JPN: ABP Japanese filters (日本用フィルタ)': 'https://raw.githubusercontent.com/k2jp/abp-japanese-filters/master/abpjf.txt'
})


const getListContent = async (url, options) => {
  let cachePath
  if (options.cache) {
    const hasher = cryptoLib.createHash('sha256')
    hasher.update(url)
    const cacheKey = hasher.digest('hex')

    cachePath = pathLib.join(options.cache, cacheKey)

    try {
      const cacheFileStat = await fsSyncPromise(cachePath)
      if (cacheFileStat.isFile()) {
        return await fsReadFilePromise(cachePath, 'utf8')
      }
    } catch {
      // pass
    }
  }

  const filterListText = (await requestPromiseLib(url)).trim()

  if (cachePath !== undefined) {
    await fsWriteFilePromise(cachePath, filterListText, 'utf8')
  }

  return filterListText
}


const _listUrlsToNames = Object.entries(_listNamesToUrls)
  .reduce((prev, cur) => {
    const [name, url] = cur
    prev[url] = name
    return prev
  }, Object.create(null))

const listUrls = _ => Object.values(_listNamesToUrls)
const listNames = _ => Object.keys(_listNamesToUrls)

const nameForListUrl = url => _listUrlsToNames[url]

module.exports = {
  getListContent,
  listNames,
  listUrls,
  nameForListUrl
}
