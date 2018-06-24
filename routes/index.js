var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Account = require('../models/m_account');
var Category = require('../models/m_category');
var Option = require('../models/m_option');
var Record = require('../models/m_record');
var Calendar = require('../models/m_calendar');
let async = require('async');

// Date.prototype.yyyymmdd = function () {
//     let mm = this.getMonth() + 1; // getMonth() is zero-based
//     let dd = this.getDate();
//
//     // return [
//     //     this.getFullYear(),
//     //     (mm > 9 ? '' : '0') + mm,
//     //     (dd > 9 ? '' : '0') + dd
//     // ].join('');
//     return (mm > 9 ? '' : '0') + mm;
// };

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
}

let r_show = [{header: "碩士班轉系所申請", date: "0601"},{header: "碩士班轉系所申請", date: "0602"},{header: "碩士班轉系所申請", date: "0603"},{header: "碩士班轉系所申請", date: "0604"},{header: "碩士班轉系所申請", date: "0605"},{header: "碩士班轉系所申請", date: "0606"},{header: "碩士班轉系所申請", date: "0607"},{header: "碩士班轉系所申請", date: "0608"},{header: "碩士班轉系所申請", date: "0609"},{header: "碩士班轉系所申請", date: "0610"},{header: "碩士班轉系所申請", date: "0611"},{header: "碩士班轉系所申請", date: "0612"},{header: "碩士班轉系所申請", date: "0613"},{header: "碩士班轉系所申請", date: "0614"},{header: "碩士班轉系所申請", date: "0615"},{header: "碩士班轉系所申請", date: "0616"},{header: "碩士班轉系所申請", date: "0617"},{header: "碩士班轉系所申請", date: "0618"},{header: "碩士班轉系所申請", date: "0619"},{header: "碩士班轉系所申請", date: "0620"},{header: "碩士班轉系所申請", date: "0621"},{header: "碩士班轉系所申請", date: "0622"},{header: "碩士班轉系所申請", date: "0623"},{header: "碩士班轉系所申請", date: "0624"},{header: "碩士班轉系所申請", date: "0625"},{header: "碩士班轉系所申請", date: "0626"},{header: "碩士班轉系所申請", date: "0627"},{header: "碩士班轉系所申請", date: "0628"},{header: "碩士班轉系所申請", date: "0629"},{header: "碩士班轉系所申請", date: "0630"},{header: "第 2 次教務會議", date: "0604"},{header: "學雜費減免申請", date: "0605"},{header: "學雜費減免申請", date: "0604"},{header: "學雜費減免申請", date: "0606"},{header: "學雜費減免申請", date: "0607"},{header: "學雜費減免申請", date: "0608"},{header:"	畢業典禮", date: "0609"},{header: "校務會議", date: "0615"},{header: "端午節", date: "0618"},{header: "申請休學、學位考試截止日", date: "0621"},{header: "期末隨堂考試", date: "0625"},{header: "期末隨堂考試", date: "0626"},{header: "期末隨堂考試", date: "0627"},{header: "期末隨堂考試", date: "0628"},{header: "期末隨堂考試", date: "0629"}];

/// 學院別
let first_college = [101,103,104]; // 文學院
let second_college = [701,702,703]; // 理學院
let third_college = [202,203,204,205,206,207,208,209]; //社科院
let fourth_college = [301,302,303,304,305,306,307,308]; //商學院
let fifth_college = [401,402,403,404] // 傳播學院
let sixth_college = [501,502,503,504,505,506,507,508,509]; // 外語學院
let seven_college = [601]; // 法學院

// 時間別
let Aug = ["選課系統"];
let Sep = ["選課系統","就學貸款申請","學雜、學分費查詢及列印"];
let Oct = ["弱勢學⽣助學⾦申請","獎助學⾦查詢","個⼈獎助學⾦查詢"];
let Nov = ["學雜、學分費查詢及列印","選課系統","畢業離校檢核"];
let Dec = ["學雜費減免申請","場地申請登記"];
let Jan = ["輔系雙修申請","選課系統","成績查詢","本學期教學意⾒調查"];
let Feb = ["選課系統","就學貸款申請","學雜、學分費查詢及列印"];
let Mar = ["學雜、學分費查詢及列印","選課系統"];
let Apr = ["學⽣生住宿申請結果查詢","學⽣生住宿申請","學雜、學分費查詢及列印","選課系統"];
let May = ["學⽣生住宿申請","學⽣生住宿申請結果查詢","輔系雙修申請"];
let Jun = ["學雜費減免申請","本學期教學意⾒調查","成績查詢"];
let Jul = ["成績查詢","選課系統"];


// 級別
let one = ["學⽣個⼈基本資料維護","學生履歷維護","場地申請登記","⾨禁註銷及學生證補(換)發"];
let two = ["場地申請登記","⾨禁註銷及學生證補(換)發"];
let three = ["⾨禁註銷及學生證補(換)發","畢業離校檢核"];
let four = ["⾨禁註銷及學生證補(換)發","畢業離校檢核","學⼠班四年級體育補修申請"];

let recommend_list = {
    'Aug':Aug,
    'Sep':Sep,
    'Oct':Oct,
    'Nov':Nov,
    'Dec':Dec,
    'Feb':Feb,
    'Jan':Jan,
    'Mar':Mar,
    'Apr':Apr,
    'May':May,
    'Jun':Jun,
    'Jul':Jul,
    'one':one,
    'two':two,
    'three':three,
    'four':four
}

let update_list = {
    "學⽣生住宿申請":["住宿","申請"],
    "學⽣生住宿申請結果查詢":["住宿","申請","結果","查詢"],
    "宿舍請修":["宿舍","請修"],
    "宿舍包裹郵件查詢":["宿舍","包裹","查詢"],
    "校外租賃查詢":["租賃","查詢"],
    "成績查詢":["成績","成績"],
    "當學期在學證明列列印服務":["證明","列印"],
    "⼯讀時數登錄系統-學生版":["系統","登錄","⼯讀"],
    "全人發展與⾃我管理":["管理","全人"],
    "學⽣個⼈基本資料維護":["資料","維護"],
    "工讀申請":["工讀","申請"],
    "職涯諮詢預約":["職涯","諮詢","預約"],
    "學生履歷維護":["學生","履歷","維護"],
    "操行成績暨獎懲紀錄證明":["操行","成績","獎懲","紀錄","證明"],
    "學⽣請假系統":["學⽣","請假","系統"],
    "電算中心線上服務台":["電算中心","服務台"],
    "⾨禁註銷及學生證補(換)發":["⾨禁註銷","學生證"],
    "緊急聯絡⼈":["聯絡"],
    "⼼靈導師預約":["導師","預約"],
    "重要會議查詢":["會議","查詢"],
    "就學貸款申請":["貸款","申請"],
    "獎助學⾦查詢":["助學⾦","查詢"],
    "各類所得暨保費扣繳憑單":["扣繳憑單"],
    "學⽣入帳明細查詢":["學⽣","入帳明細","查詢"],
    "弱勢學⽣助學⾦申請":["弱勢","學⽣","助學⾦","申請"],
    "學雜、學分費查詢及列印":["學雜","學分費","查詢","列印"],
    "個⼈獎助學⾦查詢":["助學⾦","查詢"],
    "學雜費減免申請":["學雜費","申請"],
    "出國進修補助":["出國","補助"],
    "就學貸款申請":["貸款","申請"],
    "選課系統":["選課","系統"],
    "外語⽂檢定成績登錄":["檢定","成績","登錄"],
    "超減修習學分數申請":["學分","申請"],
    "輔系雙修申請":["輔系","申請"],
    "畢業離校檢核":["畢業","檢核"],
    "學⼠班四年級體育補修申請":["體育","補修","申請"],
    "優先服務認證":["服務","認證"],
    "出國選課申請":["選課","申請"],
    "場地申請登記":["申請","登記"],
    "遺失物品查詢":["查詢"],
    "團體活動緊急通聯登錄":["登錄"],
    "社團/系級幹部":["幹部"],
    "暑期營隊宿舍申請":["申請","宿舍"],
    "本學期教學意⾒調查":["意⾒","調查"],
    "表單服務系統":["表單","服務","系統"],
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
router.get('/update_option',function(req,res,next){
    for(let i in update_list){
        Option.update({
            name:i
        },{
            keyword:update_list[i]
        },function(err,rsp){
            if(err){
                console.log("err: "+err)
            } else {
                console.log(i)
            }
        })
    }
})

router.get('/update_category_option',function(req,res,next){
    for(let i in update_list){
        Option.updateMany({
            name:i,
        },{
            keyword:update_list[i]
        },function(err,rsp){
            if(err){
                console.log("err: "+err)
            } else if(rsp.nModified != 0){
                console.log(rsp)
                console.log(i)
            }
        })
    }
})


router.get('/account',function(req,res,next){
    Account.list({
    },function(err,rsp){
        if(err){
            console.log("err: "+err)
        } else {
            rsp.title = "123";
            console.log(rsp)
            res.render('login', rsp);
        }
    })
})

router.get('/option',function(req,res,next){
    Option.list({
    },function(err,rsp){
        if(err){
            console.log("err: "+err)
        } else {
            rsp.title = "123";
            for(let i in rsp){
                console.log(rsp[i].name);
            }
            res.end("success");
        }
    })
})

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
                data.username = rsp.username.split("")[0]+rsp.username.split("")[1]+rsp.username.split("")[2];
                console.log(data.username);
                callback();
            }
        });
    }, function(callback){
        data.recommend_list = [];
        Option.sort_list({
        },function(err,rsp){
            if(err){
                console.log("err: "+err)
            } else {
                console.log(rsp)
                for(let i = 0;i<10;i++){
                    console.log(rsp[i].keyword);
                    if(rsp[i].keyword.length != 0){
                        data.recommend_list = data.recommend_list.concat(rsp[i].keyword);
                    }
                    if(i == 9){
                        console.log(data.recommend_list);
                        var origin = data.recommend_list
                        var result = origin.reduce((obj, item) => {
                            obj[item] = 1;
                            return obj;
                        }, {});
                        data.recommend_list = Object.keys(result);
                        callback();
                    }
                }
            }
        })
    }, function(callback){
        data.record_list = [];
        Record.date_list({
            account_id:req.session.user_id
        },function(err,rsp){
            if(err){
                console.log("err: "+err)
            } else {
                console.log("length: "+rsp.length);
                for(let i = 0;i<Math.min(5,rsp.length);i++){
                    if( typeof rsp[i].option_id.name != "undefined"){
                        data.record_list.push(rsp[i].option_id.name);
                    }
                }
                console.log(data.record_list);
                data.fav_list = data.record_list;
                callback();
            }
        })
    }, function(callback){
        let change = {
            '1':'Jan',
            '2':'Feb',
            '3':'Mar',
            '4':'Apr',
            '5':'May',
            '6':'Jan',
            '7':'Jul',
            '8':'Aug',
            '9':'Sep',
            '10':'Oct',
            '11':'Nov',
            '12':'Dev'
        }
        let date =  new Date().getMonth();
        console.log(date);
        date = date+1;
        let month = change[date.toString()];
        data.fav_list = data.fav_list.concat(recommend_list[month]);
        callback();
    }, function(callback){
        data.username = parseInt(data.username);
        if(107-data.username == 0){

        } else if(107-data.username == 1){
            data.fav_list = data.fav_list.concat(recommend_list['one']);
            callback();
        } else if(107-data.username == 2){
            data.fav_list = data.fav_list.concat(recommend_list['two']);
            callback();
        } else if(107-data.username == 3){
            data.fav_list = data.fav_list.concat(recommend_list['three']);
            callback();
        } else if(107-data.username == 4){
            data.fav_list = data.fav_list.concat(recommend_list['four']);
            callback();
        }
    }, function(callback){
        data.fav_list = data.fav_list.concat(data.record_list);
        var origin = data.fav_list
        var result = origin.reduce((obj, item) => {
            obj[item] = 1;
            return obj;
        }, {});
        data.fav_list = Object.keys(result);
        console.log(data.fav_list);
        callback();
    }, function(callback){
        Option.list({}, (err, rsp) => {
            if (err){
                next(err);
            } else {
                res.render('index', {
                    title: '政大學生校務行政系統',
                    list: rsp,
                    account: data.account,
                    recommend_list: data.recommend_list,
                    fav_list:data.fav_list
                });
            }
        });
    }]);
});

router.post('/ajax_login', (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.pwd)
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

router.get('/test100', function(req,res,next){
  Category.list({},(err,rsp)=>{
    if(err){
      res.send(err);
    }else{
      res.send(rsp);
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

router.post('/ajax_click_count',function(req,res,next){
    let data = {};
    async.waterfall([
        function(callback) {
            Option.detail({
                _id:req.body.option_id
            },function(err,rsp){
                data.count = rsp.count_click;
                data.count ++;
                callback(err);
            })
        },
        function(callback) {
            Option.update({
                _id:req.body.option_id
            },{
                count_click:data.count
            },function(err,rsp){
                res.json({
                    status:true
                })
            })
        }
    ], function(err) {
        console.dir(err);
        next(err);
    });
})

router.post('/ajax_self_click_count',function(req,res,next){
    let data = {};
    async.waterfall([
        function(callback) {
            Record.insert({
                account_id:req.session.user_id,
                option_id:req.body.option_id,
                college_id:req.body.college_id
            },function(err,rsp){
                if(err){
                    console.log(err);
                    res.json({
                        status:false
                    })
                } else {
                    res.json({
                        status:true
                    })
                }
            })
        }
    ], function(err) {
        console.dir(err);
        next(err);
    });
})

router.get('/login', function(req, res, next) {
  res.render('login', {
      title: '登入'
  });
});

router.get('/main', function(req, res, next) {
    async.series([function(callback){
        Calendar.list({}, (err, rsp) => {
            if (err){
                next(err);
            } else {
                res.render('main', {
                    title: '登入',
                    calendar: rsp
                });
            }
        });
    }]);

});

module.exports = router;
