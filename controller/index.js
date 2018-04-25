const {Router} = require("express");
const router = Router();
const jwt = require('express-jwt');//导入jwt
const tokenConfig = require("../config/tokenConfig");
const getToken = require("./function/verifyToken");
const jwtVerify = require('../config/jwtVerify')

// router.use("/uploadToken", require("./upload/qiniu")); //七牛token
router.use('/upload',require('./upload/qiniu'));   //七牛token
router.use('/login',require('./login'));   //管理员登录
router.use('/users',jwtVerify,require('./users'));   //用户
router.use('/interaction',jwtVerify,require('./interaction'));   //互动
router.use("/carousels", require("./carousels"));   //轮播图
router.use('/newsCategory',require('./newsCategory')); //新闻分类
router.use('/news',require('./news'));   //新闻


//这种express-jwt验证是否登录
router.use('/review',
    jwt({
        secret: tokenConfig.secret,
        // credentialsRequired: false,    //是否需要资格  false :表示未登录也可以访问 ，有没有token都可以进入，而且都可以用req.user
        getToken
    }),
    require('./review'));   //民主评议分类，列表
router.use('/perSummary',
    jwt({
        secret: tokenConfig.secret,
        getToken
    }),
    require('./perSummary'));   //个人总结

router.use('/branches',jwtVerify,require('./branches'));   //分支
router.use('/reports',jwtVerify,require('./reports'));   //思想总结，心得汇报
router.use('/scores',jwtVerify,require('./scores'));   //积分
// router.use('/getToken',require('./getToken'));   //jwt

module.exports = router;