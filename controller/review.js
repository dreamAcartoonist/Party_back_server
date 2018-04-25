const {Router} = require('express');
const router = Router();
const review = require('../database/model/review');

//民主评议
//管理员添加民主评议
router.post('/add', (req, res, next) => {
    "use strict";
    let {title, desc} = req.body;
    // console.log(label, value)
    if(req.user.level.type == 0){
        review.create({desc, title}).then( data => {
            res.json({
                data:'分类添加成功',
                code:200,
                msg:'分类添加成功',
                ret:true
            })
        }).catch( err => {
            next(new Error(err))
        })
    }else{
        res.json({
            data: "该操作需要管理员权限",
            code: 401,
            msg: "该操作需要管理员权限"
        })
    }

});

//管理员获取民主评议列表
router.get('/get',(req, res, next) => {
    "use strict";
    let { page = 1, pageSize =10 , id} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if(!id){
        //未传id
        review.find().skip( (page-1)*pageSize ).limit(pageSize).then( data => {
            res.json({
                data,
                code:200,
                msg:'分类查询成功',
                ret:true
            })
        }).catch( err => {
            new Error(err)   //使用Error构造方法创建自定义的Error对象
            next(err)
        })
    }else{
        //传id
        review.findOne({_id:id}).then( data => {
            res.json({
                data,
                code:200,
                msg:'分类查询成功',
                ret:true
            })
        }).catch(err => {
            new Error(err);
            next(err)
        })
    }
});
//分类修改
router.post('/update', (req, res, next) => {
    "use strict";
    let {desc, title, status, id} = req.body;
    status = parseInt(status)

    if(req.user.level.type == 0){
        if(!id){
            res.json({
                data:'未找到指定的id',
                code:400,
                msg:'未找到指定的id',
                ret:true
            })
            return
        }else {
            review.update({_id: id},{$set:{desc, title, status}}).then( data => {
                res.json({
                    data:'success',
                    code:200,
                    msg:'分类添加成功',
                    ret:true
                })
            }).catch( err => {
                new Error(err);
                next(err)
            })
        }
    }else {
        res.json({
            data: "该操作需要管理员权限",
            code: 401,
            msg: "该操作需要管理员权限"
        })
    }
});
// 修改民主评议的状态
router.post('/updateStatus', (req, res, next) => {
    "use strict";
    let {status, id} = req.body;
    status = parseInt(status)

    if(req.user.level.type == 0){
        if(!id){
            res.json({
                data:'未找到指定的id',
                code:400,
                msg:'未找到指定的id',
                ret:true
            })
            return
        }else {
            if(status&& status == 1){   //开启民主评议
                //查重
                review.findOne({status}).then( dt => {
                    if(dt == null){
                        review.update({_id: id}, {$set: {status}}).then(data => {
                            res.json({
                                data: "民主评议开启成功",
                                code: 200,
                                msg: "民主评议开启成功"
                            })
                        })
                    }else {
                        res.json({
                            data: "已经有一个已经开启的民主评议了",
                            code: 400,
                            msg: "已经有一个已经开启的民主评议了"
                        })
                    }
                })
            }else if(status&&status == 2){ //关闭一个民主评议
                review.update({_id: id}, {$set: {status}}).then(data => {
                    res.json({
                        data: "评议结束成功",
                        code: 200,
                        msg: "评议结束成功"
                    })
                }).catch(err => {
                    next(new Error(err))
                })
            }
        }
    }else {
        res.json({
            data: "该操作需要管理员权限",
            code: 401,
            msg: "该操作需要管理员权限"
        })
    }
});

//分类删除
router.post('/del', (req, res, next ) => {
    "use strict";
    let {id} = req.body

    if(req.user.level.type == 0){
        if(!id){
            res.json({
                data:'未找到指定的id',
                code:400,
                msg:'未找到指定的id',
                ret:true
            })
        }else {
            review.remove({_id: id}).then( data => {
                res.json({
                    data:'success' ,
                    code:200,
                    msg:'分类删除成功',
                    ret:true
                })
            }).catch( err => {
                new Error(err);
                next(err)
            })
        }
    }else {
        res.json({
            data: "该操作需要管理员权限",
            code: 401,
            msg: "该操作需要管理员权限"
        })
    }
});

//批量删除接口
router.post('/delMany', (req, res, next) => {
    "use strict";
    let {id} = req.body

    if(!id){
        res.json({
            data:'该民主评议不存在',
            code:400,
            msg:'该民主评议不存在',
            ret:false
        })
        return
    }else{
        review.remove({_id:{$in: id }}).then( data => {
            if(data.n == id.length){
                res.json({
                    data:'success',
                    code:200,
                    msg:'民主评议删除成功',
                    ret:true
                })
            }else{
                res.json({
                    data:'民主评议删除失败',
                    code:400,
                    msg:'民主评议删除失败',
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
    review.find().then( data => {
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

module.exports = router;
