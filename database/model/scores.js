const mongoose = require('mongoose');

const scoresSchema = mongoose.Schema({
    userId:{
        type:String
    },
    type:{
        type:String
    },
    scoreName:{
        type:String
    },
    score:{
        type:String
    }
},{versionKey:false,timestamp:{createAt:'createTime',updateAt:'updateTime'} });

module.exports = mongoose.model('scores', scoresSchema, 'scores');
