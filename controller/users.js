const {Router} = require('express');
const router = Router();
const users = require('../database/model/users');
const validator = require('validator');
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/tokenConfig');

//后台用户接口
//管理员获取用户列表
router.get('/get',(req, res, next) => {
    "use strict";
    let adminToken = req.query.token || req.headers.token ||req.headers.authorization;

    let {id, page =1 ,pageSize=5} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    //这种是jsonwebtoken验证是否登录
    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态失效,请重新登录',
                code:401,
                msg:'登录状态失效,请重新登录',
                ret:true
            })
            return
        }
        if(decode.level.type == 0){
            if(!id){
                //未传id
                users.find({},{pwd: 0}).skip((page-1)*pageSize).limit(pageSize).sort({_id: -1}).then( data => {  //find({},{pwd: 0})  查找后，密码不显示
                    // data.pop();
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
            }else {
                //传id
                users.findOne({_id: id},{pwd: 0}).then( data => {
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
        }
    })
});
//管理员添加用户（注册）
router.post('/add', (req, res, next) => {
    "use strict";
    //身份证号验证
    let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    //密码验证
    var regPwd =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/

    let adminToken = req.headers.token || req.body.token || req.query.token;

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {   //jwt.verify解密签名  decode解密签名里的信息
        if(err){
            res.status(401).send("登录状态失效，请重新登录");
            return
        }
        if(decode.level.type == 0) { //管理员 才有添加用户权限
            let {
                idCard,
                pwd,
                avatar,
                userName,
                phone,
                homeAddr,
                workAddr,
                nation,
                weChat,
                qq,
                sex,
                edu,
                position,
                salary,
                joinTime,
                payTime,
                status,
                level
            } = req.body;
            if(!idCard || validator.isEmpty(idCard.trim()) || !regId.test(idCard) ){
                res.json({
                    data:'身份证号不合法',
                    code:400,
                    msg:'身份证号不合法',
                    ret:false
                })
                return
            }else if(!pwd || validator.isEmpty(pwd.trim() ) || !regPwd.test(pwd) ){
                res.json({
                    data:'密码不合法',
                    code:400,
                    msg:'密码不合法',
                    ret:false
                })
                return
            }else {
                //查重
                users.findOne({idCard}).then(dt  => {
                    if(dt == null ){
                        users.create({
                            idCard,
                            pwd:md5(pwd),
                            // pwd,
                            avatar,
                            userName,
                            phone,
                            homeAddr,
                            workAddr,
                            nation,
                            weChat,
                            qq,
                            sex,
                            edu,
                            position,
                            salary,
                            joinTime,
                            payTime,
                            status,
                            level
                        }).then( data => {
                            res.json({
                                data:'success',
                                code:200,
                                msg:'用户添加成功',
                                ret:true
                            })
                        }).catch( err => {
                            new Error(err);
                            next(err)
                        })
                    }else{
                        res.json({
                            data: '用户名已存在',
                            code: 400,
                            msg: '用户名已存在'
                        })
                    }
                })
            }
        }
    })
});
//管理员更改用户信息
router.post('/update',(req, res, next) => {
    "use strict";
    //身份证号验证
    let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    //密码验证
    var regPwd =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,16}$/

    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data: "登录状态失效，请重新登录",
                code: 401,
                msg: "登录状态失效，请重新登录"
            })
            return
        }
        let {
            id,
            idCard,
            pwd,
            avatar,
            userName,
            phone,
            homeAddr,
            workAddr,
            nation,
            weChat,
            qq,
            sex,
            edu,
            position,
            salary,
            joinTime,
            payTime,
            status,
            level
        } = req.body;
        if(decode.level.type == 0){
            if(!idCard || validator.isEmpty(idCard.trim()) || !regId.test(idCard) ){
                res.json({
                    data:'身份证号不合法',
                    code:400,
                    msg:'身份证号不合法',
                    ret:false
                })
                return
            }else if(!pwd || validator.isEmpty(pwd.trim() ) || !regPwd.test(pwd) ){
                res.json({
                    data:'密码不合法',
                    code:400,
                    msg:'密码不合法',
                    ret:false
                })
                return
            }else if(!id){
                res.json({
                    data:'未找到指定的id',
                    code:400,
                    msg:'未找到指定的id',
                    ret:false
                })
                return
            }else{
                users.update({_id: id},{$set:{idCard, pwd:md5(pwd), avatar, userName, phone, homeAddr, workAddr, nation, weChat, qq, sex, edu, position, salary, joinTime, payTime,status,level } }).then( data => {
                    if(data.n == 1 ){
                        res.json({
                            data:'success',
                            code:200,
                            msg:'用户修改成功',
                            ret:true
                        })
                    }else {
                        res.json({
                            data:'用户修改失败',
                            code:400,
                            msg:'用户修改失败',
                            ret:false
                        })
                    }
                }).catch( err => {
                    new Error(err);
                    next(err)
                })
            }
        }
    })
})
// 管理员删除用户
router.post('/delOne', (req, res, next ) => {
    "use strict";
    let {id} = req.body
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err) {
            res.json({
                data: err,
                code: 401,
                msg: '登录状态失效，请重新登录'
            })
            return
        }
        if(decode.level.type == 0){
            if(!id){
                res.json({
                    data:'用户不存在',
                    code:400,
                    msg:'用户不存在',
                    ret:false
                })
                return
            }else{
                users.remove({_id:id }).then( data => {
                    if(data.n == 1){
                        res.json({
                            data:'success',
                            code:200,
                            msg:'用户删除成功',
                            ret:true
                        })
                    }else{
                        res.json({
                            data:'用户删除失败',
                            code:400,
                            msg:'用户删除失败',
                            ret:false
                        })
                    }
                }).catch( err => {
                    new Error(err);
                    next(err)
                })
            }
        }
    })
})
//管理员批量删除用户 2个及以上
router.post('/del', (req, res, next) => {
    "use strict";
    let {id} = req.body;
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err) {
            res.json({
                data: err,
                code: 401,
                msg: '登录状态失效，请重新登录'
            })
            return
        }
        if(decode.level.type == 0){
            if(!id){
                res.json({
                    data:'用户不存在',
                    code:400,
                    msg:'用户不存在',
                    ret:false
                })
                return
            }else{
                users.remove({_id:{$in: id }}).then( data => {
                    // console.log(data)
                    // console.log(id.length)
                    if(data.n == id.length){
                        res.json({
                            data:'success',
                            code:200,
                            msg:'用户删除成功',
                            ret:true
                        })
                    }else{
                        res.json({
                            data:'用户删除失败',
                            code:400,
                            msg:'用户删除失败',
                            ret:false
                        })
                    }
                }).catch( err => {
                    new Error(err);
                    next(err)
                })
            }
        }
    })
});
//管理员批量重置密码
router.post("/updateManyPwd", (req, res, next) => {    //管理员批量重置密码
    let {userId} = req.body;
    // console.log(users)
    //此处需要写登录判断
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        "use strict";
        if(err){
            res.json(err)
            return
        }
        // res.json({decode})
        if(decode.level.type == 0){
            users.update({_id: {$in: userId}},{$set:{pwd: md5('123456')}},{multi: true}).then(data => {   //multi: true 权限认证请自行添加
                // console.log(data.n)
                // console.log(userId.length)
                // console.log(userId)
                if(data.n == userId.length){
                    // console
                    res.json({
                        data: "批量重置密码成功",
                        code: 200,
                        msg: "批量重置密码成功",
                        ret:true
                    })
                }else{
                    res.json({
                        data:'批量重置密码失败',
                        code: 400,
                        msg: "批量重置密码失败",
                        ret:false
                    })
                }
            }).catch(err => {
                let error = new Error(err);
                next(error)
            })
        }
    })
});
//管理员禁用用户
router.post('/isCanLogin', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token;
    let {id ,isCanLogin} = req.body

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态已失效，请重新登录',
                code:401,
                msg:'登录状态失效，请重新登录',
                ret:true
            })
            return
        }
        if(decode.level.type == 0) {
            users.update({_id: id},{$set: {isCanLogin} }).then( data => {
                res.json({
                    data:'修改用户权限成功',
                    code:200,
                    msg:'修改用户权限成功',
                    ret:true
                })
            }).catch( err => {
                next(new Error(err))
            })
        }
    })
})
//管理员获取分支用户列表
router.get('/getBranchUser', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token;
    let {branchId, page =1, pageSize= 5} = req.query;

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(!branchId){
            res.json({
                data:'没找到指定的分支id',
                code:400,
                msg:'没找到指定的分支id',
                ret:false
            })
            return
        }else {
            users.find({branchId}).sort({_id: -1}).skip((page-1)*pageSize).limit(pageSize).then( data => {
                if(branchId == '5ad59ea06b5b131489f0044d'){   //管理员所在的分支
                    data.pop();   //删除管理员，在不会获取到管理员的信息
                    res.json({
                        data,
                        code:200,
                        msg:'查找成功',
                        ret:true
                    })
                }else {
                    res.json({
                        data,
                        code:200,
                        msg:'查找成功',
                        ret:true
                    })
                }
            }).catch( err => {
                next(new Error(err))
            })
        }
    })
});
//数据库文档总数获取
router.get('/getNumber', (req, res, next) => {
    "use strict";
    let adminToken = req.headers.token || req.body.token || req.query.token || req.cookies.token;
    let {branchId} = req.query

    jwt.verify(adminToken, tokenConfig.secret, (err, decode) => {
        if(err){
            res.json({
                data:'登录状态失效,请重新登录',
                code:401,
                msg:'登录状态失效,请重新登录',
                ret:false
            })
            return
        }
        if(decode.level.type == 0){
            // getNum(users)
            let params = branchId == undefined ? {} : {branchId};
            users.find(params).then( data => {
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
            })
        }
    })
})

module.exports = router;

