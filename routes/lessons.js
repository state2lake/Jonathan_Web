var express = require('express');
var router = express.Router();

/* GET lessons page. */
router.get('/lessons', function(req, res, next) {
    res.render('lessons', { title: 'Expresss' });
});

module.exports = router;
