const {Router} = require('express');
const router = Router();
const interaction = require('../database/model/interaction')
const users = require('../database/model/users')

//管理员获取帖子列表接口
router.get('/get', (req, res, next) => {
    "use strict";
    let { page=1, pageSize=5, id} = req.query
    page = parseInt(page)
    pageSize =parseInt(pageSize)

    if(!id){
        //未传id
        interaction.find({isParent: 0}).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).then( data => {
            res.json({
                data,
                code:200,
                msg:'获取数据成功',
                ret:true
            })
        }).catch( err => {
            new Error(err);
            next(err)
        })
    }else {
        //传id
        interaction.findOne({_id: id}).then( data => {
            res.json({
                data,
                code:200,
                msg:'获取帖子列表成功',
                ret:true
            })
        }).catch( err => {
            next(new Error(err))
        })
    }
});

//获取回复
router.get('/getReply', (req, res, next) => {
    "use strict";
    let {parentId, pageSize =10, page =1 } = req.query;

    interaction.find({parentId}).skip((page-1)*pageSize).limit(pageSize).then( data => {
        res.json({
            data,
            code:200,
            msg:"获取回复成功",
            ret:true
        })
    }).catch( err => {
        next(new Error(err))
    })
});

//帖子删除接口
router.post('/del', (req, res, next) => {
    "use strict";
    let {id} = req.body

    if(!id){
        res.json({
            data:'该帖子不存在',
            code:400,
            msg:'该帖子不存在',
            ret:false
        })
        return
    }else{
        interaction.remove({_id:id}).then( data => {
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
    }
})

//帖子批量删除接口
router.post('/delMany', (req, res, next) => {
    "use strict";
    let {id} = req.body

    if(!id){
        res.json({
            data:'该帖子不存在',
            code:400,
            msg:'该帖子不存在',
            ret:false
        })
        return
    }else{
        interaction.remove({_id:{$in: id }}).then( data => {
            if(data.n == id.length){
                res.json({
                    data:'success',
                    code:200,
                    msg:'帖子删除成功',
                    ret:true
                })
            }else{
                res.json({
                    data:'帖子删除失败',
                    code:400,
                    msg:'帖子删除失败',
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
    interaction.find({isParent: 0}).then( data => {
        for(var key in data){
            var num = key
        }
        console.log(num)
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
