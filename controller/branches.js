const {Router} = require('express');
const router = Router();
const branches = require('../database/model/branches');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/tokenConfig')

//分支添加接口
router.post('/add', (req, res, next) => {
    "use strict";
    let {branchName} = req.body
    let adminToken = req.headers.token || req.body.token || req.query.token;

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态失效，请重新登录',
                code:401,
                msg:'登录状态失效，请重新登录',
                ret:false
            })
            return
        }
        if(decode.level.type == 0){
            //查重
            branches.findOne({branchName}).then( dt => {
                if(dt == null){
                    branches.create({branchName}).then( data => {
                        res.json({
                            data:'分支添加成功',
                            code:200,
                            msg:'分支添加成功',
                            ret:true
                        })
                    }).catch( err => {
                        new Error(err)
                        next(err)
                    })
                }else {
                    res.json({
                        data:'分支已存在',
                        code:400,
                        msg:'分支已存在',
                        ret:false
                    })
                }
            })
        }
    })
});

//分支获取接口
router.get('/get', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token;
    let {page =1, pageSize =10, id} = req.query;
    page = parseInt(page)
    pageSize = parseInt(pageSize)

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态失效,请重新登录',
                code:401,
                msg:'登录状态失效，请重新登录',
                ret:false
            })
            return
        }
        let params = id == undefined ? { } : {_id:id};
        branches.find(params).sort({_id: -1}).skip((page -1 )*pageSize).limit(pageSize).then( data => {
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
    })
});

//分支修改接口
router.post('/update', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token;
    let {id, branchName} = req.body

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态失效，请重新登录',
                code:401,
                msg:'登录状态失效，请重新登录',
                ret:true
            })
            return
        }
        if(decode.level.type == 0) {
            if(!id){
                res.json({
                    data:'未找到指定的id',
                    code:400,
                    msg:'未找到指定的id',
                    ret:false
                })
            }else {
                branches.update({_id: id}, {$set :{branchName}} ).then( data => {
                    res.json({
                        data:'分支修改成功',
                        code:200,
                        msg:'分支修改成功',
                        ret:true
                    })
                }).catch( err => {
                    new Error(err);
                    next(err)
                })
            }
        }
    })
});

//分支删除接口
router.post('/del', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token;
    let {id} = req.body

    jwt.verify(adminToken, tokenConfig.secret, (err, decod) => {
        if(err){
            res.json({
                data:'登录状态失效，请重新登录',
                code:401,
                msg:'登录状态失效，请重新登录',
                ret:true
            })
            return
        }
        if(decod.level.type == 0) {
            if(id){
                branches.remove({_id: id}).then( data => {
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
            }else {
                res.json({
                    data:'未找到指定的id',
                    code:400,
                    msg:'未找到指定的id',
                    ret:false
                })
            }
        }
    })
});
module.exports = router;