const {Router} = require('express');
const router = Router();
const users = require('../database/model/users');
const validator = require('validator');
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/tokenConfig');
const scores = require('../database/model/scores');


//管理员登录接口
router.post("/", (req, res, next) => {
    "use strict";
    let {userName, pwd} = req.body;

    users.findOne({idCard:userName}).then(data => {
        if(data == null) {
            res.json({
                data: "用户名不存在",
                code: 400,
                msg: "false",
                ret:false
            })
            return
        }
        if(data.isCanLogin == false){
            res.json({
                data: "用户名已被禁用",
                code: 401,
                msg: "用户名已被禁用",
                ret:false
            })
            return
        }else if(data.pwd === pwd ){   //管理员密码不加密
            let userInfo = {
                userId: data._id,
                userName: data.userName,
                idCard: data.idCard,
                level: data.level,
                avatar:data.avatar,
                branchName:data.branchName
            }
            let token = jwt.sign(userInfo, tokenConfig.secret, {expiresIn: tokenConfig.exp})
            res.cookie('token', token, { maxAge: 900000, httpOnly: true }) //把token传到cookies里
            res.json({
                data: token,
                code: 200,
                msg: "success login",
                ret:true
            })

            //积分
            // scores.create({type:1, userId:data._id, scoreName:'登录',score:5})
            // return
        }else {
            res.json({
                data: "用户名或密码错误",
                code: 400,
                msg: "用户名或密码错误",
                ret:false
            })
        }
    }).catch(err => {
        let error = new Error(err);
        next(error)
    })
});

module.exports = router;
