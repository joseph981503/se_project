var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Account = new Schema(
  {
    username: { type: String },
    password: { type: String },  //MD5
    college: { type: String} //split username => ex: 104703004 -> 703
  }
);

let Model = mongoose.model('Account', Account);

Model.insert = function(data, callback) {
    Model(data).save((err, rsp) => {
        callback(err, rsp);
    });
};

Model.delete = function(data, callback) {
    Model.remove(data, (err, rsp) => {
        callback(err, rsp);
    });
};


Model.list = function(data, callback) {
  Model.find(data).
  	exec((err, rsp)=>{
  		callback(err, rsp);
  	});
}


Model.detail = function(data, callback) {
    Model.findOne(data).
  	exec((err, rsp)=>{
  		callback(err, rsp);
  	});
};


Model.has = function(data, callback) {
    Model.findOne(data, (err, rsp) => {
        if (rsp == null) {
            callback(err, false);
        } else {
            callback(err, true);
        }
    });
};

module.exports = Model;
