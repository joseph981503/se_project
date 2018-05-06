var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Account = require('../models/m_account');

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
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
        if (result) {
            req.session.user_id = result._id;
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

router.get('/ajax_logout', function(req, res, next) {
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


module.exports = router;
