var express = require('express');
var router = express.Router();
var news = require('../database/model/news');

//后台接口
//新闻 数据获取接口
router.get('/get', (req, res, next) => {
    "use strict";
    let {page =1, pageSize= 5, id, type} = req.query;
    // let  page = parseInt(page)  这样写的话会重复声明
    page = parseInt(page);
    // let pageSize = parseInt(pageSize)  这样写的话会重复声明
    pageSize = parseInt(pageSize)

    if(!id){
        //未传id
        // 声明一个params   判断是否有传值， 没有传值，就将type赋值为{},如果有就赋值为type对象
        let params = type == undefined ? {} : {type};

        news.find(params).skip((page-1)*pageSize).limit(pageSize).sort({_id:-1}).then( data => {
            res.json({
                data,
                code:200,
                msg:'查询成功',
                ret:true
            })
        }).catch( err => {
            new Error(err)   //使用Error构造方法创建自定义的Error对象
            next(err)
        })
    }else{
        //传id
        news.findOne({_id :id}).then( data => {
            res.json({
                data,
                code:200,
                msg:'查询成功',
                ret:true
            })
        }).catch( err => {
            new Error(err);
            next(err)
        })
    }
})

//新闻 数据添加接口
router.post('/add', (req, res, next) => {
    "use strict";
    let {img, title, type, content, desc} = req.body;

    news.create({img, title, type, content, desc}).then( data => {
        res.json({
            data:'success',
            code:200,
            msg:'数据添加成功',
            ret:true
        })
    }).catch( err => {
        new Error(err)
        next(err)
    })
} );

//新闻 数据更改接口
router.post('/update', (req, res, next) => {
    "use strict";
    let { id, img, title, type, content, desc} = req.body
    news.update({_id: id},{$set:{ img, title, type, content, desc}} ).then( data => {
        if(data.n == 0){
            res.json({
                data:'id无效或未填写id',
                code:400,
                msg:'没有查找到指定的结果',
                ret:false
            })
            return;
        }else{
            res.json({
                data:'success',
                code:200,
                msg:'数据修改成功',
                ret:true
            })
        }
    }).catch( err => {
        new Error(err)
        next(err)
    })
})

//新闻 数据删除接口
router.post('/del', (req, res, next) => {
    "use strict";
    let {id} = req.body;

    news.remove({_id: id}).then( data => {
        if(data.n == 0){
            res.json({
                data:'id无效或未填写id',
                code:400,
                msg:'没有查找到指定的结果',
                ret:false
            })
            return;
        }else{
            res.json({
                data:'success',
                code:200,
                msg:'数据删除成功',
                ret:true
            })
        }
    }).catch( err => {
        new Error(err);
        next(err)
    })
})

//数据库集合文档数量统计获取
router.get('/getNumber', (req, res, next) => {
    "use strict";
    let {type} = req.query
    let params = type == undefined ? {} : {type}
    news.find(params).then( data => {
        for(var key in data){
            var num = key
        }
        // console.log(num)
        num = parseInt(num)
        res.json({
            data:num,
            code:200,
            msg:'获取文档数量成功',
            ret:true
        })
        return
    }).catch( err => {
        next(new Error(err))
    })
})

module.exports = router;
