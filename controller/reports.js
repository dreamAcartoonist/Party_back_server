const {Router} = require('express');
const router = Router();
const reports = require('../database/model/reports')

//后台
//思想汇报 提交接口
router.post('/add', (req, res, next) => {
    "use strict";
    let {img, type } = req.body;
    let userName = req.user.userName

    reports.create({userName, img, type, examine :0}).then( data => {
        res.json({
            data:'success',
            code:200,
            msg:'提交成功',
            ret:true
        })
    }).catch(err => {
        new Error(err);
        next(err)
    })
});

//思想汇报 心得总结获取接口
router.get('/get', (req, res, next) => {
    "use strict";
    let {page =1, pageSize= 10, id, type} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize)

    if(!id){
        //未传id
        // 声明一个params   判断是否有传值， 没有传值，就将type赋值为{},如果有就赋值为type对象
        let params = type == undefined ? {} : {type};
        reports.find(params).skip((page-1)*pageSize).limit(pageSize).sort({_id:-1}).then( data => {
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
        reports.findOne({_id: id}).then( data => {
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

        //分数
    }
});
//思想汇报 修改审核接口
router.post('/update', (req, res, next) => {
    "use strict";
    let {id, examine, reason} = req.body;

    reports.update({_id: id},{$set:{examine, reason} }).then( data => {
        res.json({
            data:'修改成功',
            code:200,
            msg:'修改成功',
            ret:true
        })
    }).catch(err => {
        new Error(err);
        next(err)
    })
});
//思想汇报 删除接口
router.post('/del', (req, res, next) => {
    "use strict";
    let {id} = req.body;

    reports.remove({_id: id}).then( data => {
        res.json({
            data:'删除成功',
            code:200,
            msg:'删除成功',
            ret:true
        })
    }).catch( err => {
        new Error(err);
        next(err)
    })
});

//数据库集合文档数量统计获取
router.get('/getNumber', (req, res, next) => {
    "use strict";
    let {type} =req.query
    reports.find({type}).then( data => {
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