var express = require('express');
var router = express.Router();
let Test = require('../models/m_test');

/* GET home page. */
router.get('/', function(req, res, next) {
    Test.detail({
        name: "test"
    }, (err, rsp) => {
        if (err){
            next(err);
        } else {
            console.dir(rsp);
            res.render('index', {
                title: 'Express'
            });
        }
    });

});
module.exports = router;
