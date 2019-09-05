var express = require('express');
var router = express.Router();

/* GET lessons page. */
router.get('/', function(req, res){
    res.render('datePicker', {
        title: 'Date and Time'
    });
});

module.exports = router;