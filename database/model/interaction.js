const mongoose = require('mongoose');

var interSchema = mongoose.Schema({
    isParent: {
        type: Number,
        default: 0,
        index: true
    },
    parentId: {
        type: String,
        defalut: ''
    },
    userId: {        //层主
        type: String
    },
    userName: {
        type: String
    },
    userAvatar: {
        type: String
    },
    toUserId: {      //楼主
        type: String
    },
    toUserName: {
        type: String
    },
    toUserAvatar: {
        type: String
    },
    content: {
        type: String
    }
}, {versionKey: false, timestamp: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model('interaction',interSchema,'interaction');
