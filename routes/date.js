var express = require('express');
var router = express.Router();

/* GET date page. */
router.get('/', function(req, res){
    res.render('date', {
        title: 'About'
    });
});

module.exports = router;