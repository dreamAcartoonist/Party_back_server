const {Router} = require('express');
const router = Router();
const scores = require('../database/model/scores')

//前台
//个人积分获取接口
router.get('/get', (req, res, next) => {
    "use strict";
    scores.find().then( data => {
        res.json({
            data,
            code:200,
            msg:'查询成功',
            ret:true
        })
    }).catch(err => {
        new Error(err);
        next(err)
    })
});

module.exports = router
