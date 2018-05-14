const {Given,When,Then,And} = require('cucumber')
var search = require('../support/actions').search
var switch_account_to = require('../support/actions').switch_account_to

fc = ""

Given('想要搜尋的校務功能 {string}', function (searching_function) {
    fc = searching_function
});

When('在搜尋列輸入功能標題的隨機一小段', function () {
    var from = Math.floor(Math.random() * fc.length)
    var len = Math.floor(Math.random() * fc.substr(from).length + 1)
    search_word = fc.substr(from, len)

    search(search_word)
});

Then('出現該功能', function () {
    browser.isVisible('div=' + fc) 
});
