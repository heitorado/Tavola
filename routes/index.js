var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tavola' });
});

router.get('/sheet', function(req, res) {
    res.render('sheet', { title: 'Tavola' });
});

router.get('/combat', function(req,res) {
    res.render('combat', { title: 'Tavola' });
});

module.exports = router;
