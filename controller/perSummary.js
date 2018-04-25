const {Router} = require('express');
const router = Router();
const perSummary = require('../database/model/personalSummary')

//后台
//管理员获取个人总结
router.get('/get',(req, res, next) => {
    "use strict";
    // let {id, page =1, pageSize =10} = req.body
    let {reviewId, branchId, page =1, pageSize =5, id} = req.query;
    let params = branchId ? {reviewId, branchId} : {reviewId};
    // console.log(params)

    if(id){  //个人总结
        perSummary.findOne({_id :id}).then( data => {
            res.json({
                data,
                code:200,
                msg:'查找总结成功'
            })
        })
    }else {
        perSummary.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).then( data => {
            res.json({
                data,
                code:200,
                msg:'查找成功',
                ret:true
            })
        }).catch(err => {
            new Error(err);
            next(err)
        })
    }
});

//添加个人总结
router.post('/add',(req, res, next) => {
    "use strict";
    let {pic, reviewId, branchId} = req.body;
    let userId = req.user.userId   //用户登录，userId = data._id 获取该用户的id   楼主的id

    perSummary.findOne({reviewId, userId}).then( dt => {   //当前民主评议id和登录的该用户id  查重
        if(dt == null ){
            perSummary.create({pic, reviewId, branchId, userId,  common: []}).then( data => {
                res.json({
                    data:'success',
                    code:200,
                    msg:'发表总结成功',
                    ret:true
                })
                return
            }).catch( err => {
                new Error(err);
                next(err)
            })
        }else {
            res.json({
                data:'个人总结不能重复提交',
                code:400,
                msg:'个人总结不能重复提交',
                ret:false
            })
        }
    }).catch( err => {
        next (new Error(err))
    })
});

//管理员审核个人总结
router.post('/update', (req, res, next) => {
    "use strict";
    let {id, status} = req.body

    perSummary.update({_id: id}, {$set: {status} }).then( data => {
        if(status == 1){
            res.json({
                data:'success',
                code:200,
                msg:'审核通过',
                ret:true
            })
        }else if(status == 2){
            res.json({
                data:'success',
                code:200,
                msg:'审核不通过',
                ret:true
            })
        }
    }).catch( err => {
        new Error(err);
        next(err)
    })
});

//删除
router.post('/del', (req, res, next) => {
    "use strict";
    let {id} = req.body

    perSummary.remove({_id:id}).then(data => {
        res.json({
            data:'success',
            code:200,
            msg:'删除成功',
            ret:true
        })
    }).catch( err => {
        new Error(err);
        next(err)
    })
});

module.exports = router;
