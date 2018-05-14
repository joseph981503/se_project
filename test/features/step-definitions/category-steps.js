const {Given,When,Then,And} = require('cucumber')

category_ele = ""
func_ele = ""

Given('一個分類{string} 和其底下一個功能 {string}', function (category, searching_function) {
    category_ele = 'div=' + category
    func_ele = 'div=' + searching_function
});

When('點擊{string}', function (category) {
    if(category != "個人"){
	browser.waitForEnabled(category_ele)
	browser.click(category_ele)
    }
});

Then('看到可以進去的 {string}', function (searching_function) {
    browser.waitForEnabled(func_ele)
    browser.click(func_ele)
});
