const {Before, After} = require('cucumber')
var login = require('./actions').login

Before(function(){
    //require('babel-register') // Setup Babel to write tests using next generation JavaScript
    browser.url('login') 
});

Before({tags: "@search or @category"}, function () {
    login("104703009", "test")
});
