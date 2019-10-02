'use strict'

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
  listNames,
  listUrls,
  nameForListUrl
}
