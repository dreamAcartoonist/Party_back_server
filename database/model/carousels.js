const mongoose = require('mongoose')

var carouselsSchema = mongoose.Schema({
    img:{
        type:String,
    },
    title:{
        type:String
    },
    url:{
        type:String
    },
    sort:{
        type:Number,
        default:999
    },
    isShow:{
        type:Boolean,
        default:true
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

module.exports = mongoose.model('carousels',carouselsSchema,'carousels')