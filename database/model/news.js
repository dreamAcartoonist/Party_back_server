const mongoose = require('mongoose')

var newsSchmea = new mongoose.Schema({
    img:{
        type:String
    },
    title:{
        type:String
    },
    type:{     //根据type查找不同Type类型的新闻
      type:String
    },
    desc:{
        type:String
    },
    content:{
        type:String
    },
    browse:{
        type:Number,
        default:0
    }
    // createTime:{
    //     type:Date,
    //     default:Date.now()
    // },
    // updateTime:{
    //     type:Date,
    //     default:Date.now()
    // }
},{versionKey:false,timeStamp:{createAt:'createTime',updateAt:'updateTime'}})

module.exports = mongoose.model('news',newsSchmea,'news')
