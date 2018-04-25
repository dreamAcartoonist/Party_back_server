var express = require('express');
var router = express.Router();
var carousels = require('../database/model/carousels');

//后台
// 轮播图  获取接口
router.get('/get',(req,res) => {
    "use strict";
    let {id , page= 1, pageSize=10} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let params = {}
    if (!id) {
        //不传id
        params = {}
    }else {
        params._id = id  //{_id : id}
    }
    carousels.find(params).sort({_id:-1}).skip(( page -1 )*pageSize).limit(pageSize).exec(( err, data ) => {
        if(err) {
            res.json({
                data:err,
                code:500,
                msg:'查询失败',
                ret:false
            });
            return
        }
        res.json({
            data,
            code:200,
            msg:"查找成功",
            ret:true
        });
        return
    })
});

//轮播图添加接口
router.post('/add',(req, res) => {
    "use strict";
    let {img, title, url, sort, isShow} = req.body
    carousels.create({img, title, url, sort, isShow}, (err, backData) => {
        if(err) {
            res.json({
                data:err,
                code:500,
                msg:"图片添加失败",
                ret:false
            })
            return
        }
        res.json({
            data:'success',
            code:200,
            msg:"图片添加成功",
            ret:true
        })
        return
    })
})
//轮播图更新接口
router.post('/update', (req, res) => {
    "use strict";
    let {id, img, title, url, sort, isShow} = req.body
    carousels.update({_id: id},{$set:{img, title, url, sort, isShow} }, (err, data) => {
        // console.log(data)
        if(err) {
            res.json({
                data:err,
                code:500,
                msg:'图片更新失败',
                ret:false
            })
            return
        }
        if(data.n == 0) {
            //没有指定id
            res.json({
                data:'没有找到指定id或id无效',
                code:400,
                msg:'图片修改失败',
                ret:false
            })
            return
        }else {
            res.json({
                data:'success',
                code:200,
                msg:'图片更新成功',
                ret:true
            })
            return
        }
    })
})

//轮播图删除接口
router.post('/del', (req, res) => {
    "use strict";
    let {id} = req.body
    carousels.remove({_id: id}, (err, data) => {
        if(err) {
            res.json({
                data:err,
                code:500,
                msg:'图片删除失败',
                ret:false
            })
            return
        }
        if(data.n == 1) {
            //查询到指定id
            res.json({
                data:'success',
                code:200,
                msg:'图片删除成功',
                ret:true
            })
            return
        }else{
            res.json({
                data:'无效的id',
                code:400,
                msg:'图片删除失败',
                ret:false
            })
            return
        }
    })
})

//轮播图批量删除接口
router.post('/delMany', (req, res, next) => {
    "use strict";
    let {id} = req.body

    if(!id){
        res.json({
            data:'该轮播图不存在',
            code:400,
            msg:'该轮播图不存在',
            ret:false
        })
        return
    }else{
        carousels.remove({_id:{$in: id }}).then( data => {
            if(data.n == id.length){
                res.json({
                    data:'success',
                    code:200,
                    msg:'轮播图删除成功',
                    ret:true
                })
            }else{
                res.json({
                    data:'轮播图删除失败',
                    code:400,
                    msg:'轮播图删除失败',
                    ret:false
                })
            }
        }).catch( err => {
            new Error(err);
            next(err)
        })
    }
});

//数据库集合文档数量统计获取
router.get('/getNumber', (req, res, next) => {
    "use strict";
    carousels.find().then( data => {
        for(var key in data){
            var num = key
        }
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


module.exports = router