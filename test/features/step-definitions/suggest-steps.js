const {Given,When,Then,And} = require('cucumber')
var n_most_frequent = require('../support/utilities').n_most_frequent
var intersect = require('../support/utilities').intersect
var login = require('../support/actions').login
var switch_account_to = require('../support/actions').switch_account_to
var search = require('../support/actions').search
//var clearHistory = require() // fulfill this require please.

Given('系統使用記錄是淨空的', function () {
    clearHistory()
});

var my_identity = ""
var my_id = ""
var my_password = ""
var my_functions = []
var his_id = ""
var my_password = ""
var his_functions = ""
var most_five_func = []

Given('我的身份是 {string}', function (identity) {
    if(identity=="學生"){
	my_identity = "student"
	my_id = "104703009"
	my_password = "test"
    } else if (identity=="教師"){
	my_identity = "teacher"
	my_id = "teacher"
	my_password = "test"
    }
});

Given('另一個跟我同身份的人', function () {
    if(my_identity=="student"){
	his_id = "103304004"
	his_password = "test"
    }
    else if(my_identity=="teacher"){
	his_id = "hteacher"
	his_password = "test"
    }
});

Given('一連串我的身份可以用的校務功能', function (docString) {
    my_functions = docString.split(" ") 
});

Given('一連串他可以用的校務功能', function (docString) {
    his_functions = docString.split(" ")
});

Given('兩串功能中，有交集的大於5', function () {
    expect(intersect(my_functions, his_functions).size).to.be.at.least(5)
});

When('我依序使用上述一連串的功能', function () {
    //console.log("my", my_functions)
    login(my_id, my_password)
    
    for(func of my_functions){
    	search(func)
    	funcButton = 'div=' + func
	browser.waitForEnabled(funcButton)
	browser.click(funcButton)	
    }
});

When('他依序使用了上述一連串校務功能', function () {
    //console.log("his", his_functions)
    switch_account_to(his_id, his_password)
    
    for(func of his_functions){
    	search(func)
    	funcButton = 'div=' + func
	browser.waitForEnabled(funcButton)
	browser.click(funcButton)	
    }
});

Then('個人記錄會顯示我用過的中，前五名頻繁出現的功能', function () {
    most_five_func = n_most_frequent(my_functions, 5)

    browser.click('div=取消搜尋')
    for(func of most_five_func){
	expect(browser.isVisible('div=' + func)).to.be.true
    }
    
});

Then('我的同身分熱門會顯示出,其中前五名頻繁出現的功能', function () {
    most_five_func = n_most_frequent([...my_functions,...his_functions], 5)

    browser.click('div=取消搜尋')
    for(func of most_five_func){
	expect(browser.isVisible('div=' + func)).to.be.true
    }
    
});

