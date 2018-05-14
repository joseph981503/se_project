var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Account = require('../models/m_account');
var Category = require('../models/m_category');
var Option = require('../models/m_option');
let async = require('async');


function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
}
/*
router.get('/insert', (req, res, next) => {
    let data = ['本學期教學意⾒調查', '表單服務系統'];
    async.each(data, function(item, callback){
        Option.insert({
            name: item,
            link: '#',
            category: '5aefd3a9578ca541940908bb',
        }, (err, rsp) => {
            if (err){
                callback(err);
            } else {
                callback();
            }
        });
    }, function(error){
        if (error){
            next(error);
        } else {
            res.send('success');
        }
    });
});
*/
/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
    let data = {};
    async.series([function(callback){
        Account.detail({
            _id: req.session.user_id
        }, (err, rsp) => {
            if (err){
                next(err);
            } else {
                data.account = rsp;
                callback();
            }
        });
    }, function(callback){
        Option.list({}, (err, rsp) => {
            if (err){
                next(err);
            } else {
                res.render('index', {
                    title: '政大學生校務行政系統',
                    list: rsp,
                    account: data.account
                });
            }
        });
    }]);
});

router.post('/ajax_login', (req, res, next) => {
    Account.detail({
        username: req.body.username,
        password: req.body.pwd
    }, (err, rsp) => {
        if (err) {
            res.json({
                status: false,
                msg: err
            });
        }
        if (rsp) {
            req.session.user_id = rsp._id;
            res.json({
                status: true
            });
        } else {
            res.json({
                status: false,
                msg: "沒有此使用者或帳號密碼錯誤"
            });
        }
    });
});

router.post('/ajax_logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', {
      title: '登入'
  });
});




module.exports = router;
