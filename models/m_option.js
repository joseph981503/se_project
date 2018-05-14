var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Option = new Schema(
  {
    name: { type: String },
    link: { type: String },
    category: { type: String, ref: "Category"},
    keyword: [{ type: String }],
    count_click: { type: Number, default: 0 }
  }
);

let Model = mongoose.model('Option', Option);

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
  populate("category").
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
