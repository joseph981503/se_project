// not only test in chrome(wdio.config.js) but firefox(merge wdio.andFirefox.config.js and wdio.config.js)

var merge = require('deepmerge')
var wdioConf = require('./wdio.conf.js')

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
	{
	    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
	    // grid with only 5 firefox instances available you can make sure that not more than
	    // 5 instances get started at a time.
	    maxInstances: 5,
	    //
	    browserName: 'firefox',
	    "moz:firefoxOptions": {
		// flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
		args: ['-headless']
	    }
	}
    ],

    // // run tests on sauce instead locally
    // user: process.env.SAUCE_USERNAME,
    // key: process.env.SAUCE_ACCESS_KEY,
    // services: ['sauce']
} , { clone: false });

// add an additional reporter
//exports.config.reporters.push('allure');
