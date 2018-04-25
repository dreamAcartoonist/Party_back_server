const {Router} = require('express');
const router = Router();
const category = require('../database/model/newsCategory');

//新闻分类模块
//分类添加接口
router.post('/add', (req, res, next) => {
    "use strict";
    const {label, value ,type} = req.body;
    // console.log(label, value)

    category.create({label, value, type}).then( data => {
        res.json({
            data:'分类添加成功',
            code:200,
            msg:'分类添加成功',
            ret:true
        })
    }).catch( err => {
        const error = new Error(err)
        next(err)
    })
});

//分类获取接口
router.get('/get',(req, res, next) => {
    "use strict";
    let { page = 1, pageSize =10 , id} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if(!id){
        //未传id
        category.find().skip( (page-1)*pageSize ).limit(pageSize).then( data => {
            res.json({
                data,
                code:200,
                msg:'分类查询成功',
                ret:true
            })
        }).catch( err => {
            const error = new Error(err)   //使用Error构造方法创建自定义的Error对象
            next(err)
        })
    }else{
        //传id
        category.findOne({_id:id}).then( data => {
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

module.exports = router;