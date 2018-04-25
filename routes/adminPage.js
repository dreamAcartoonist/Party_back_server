var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res, next) => {
    "use strict";
        res.sendFile(path.join(__dirname,'../adminPage/index.html'))
});

module.exports = router;