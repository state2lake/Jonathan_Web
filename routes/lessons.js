var express = require('express');
var router = express.Router();

/* GET lessons page. */
router.get('/', function(req, res){
    res.render('lessons', {
        title: 'About'
    });
});

module.exports = router;