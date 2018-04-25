const mongoose = require('mongoose')

const newsCategory = new mongoose.Schema({
    label:{
        type:String
    },
    value:{
        type:String,
        unique:true
    },
    type:{         //根据type对新闻进行分类
        type:String
    },
},{versionKey:false, timeStamp:{ createAt:'createTime',updateAt:'updateTime'} })

module.exports = mongoose.model('newsCategory', newsCategory, 'newsCategory')
