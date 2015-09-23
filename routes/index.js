var express = require('express');
var definitions=require('./definitions');
var synonyms=require('./synonyms');
var antonyms=require('./antonyms');
var examples=require('./examples');
var router = express.Router();


router.get('/def/:word', definitions.get);
router.get('/syn/:word', synonyms.get);
router.get('/ant/:word', antonyms.get);
router.get('/ex/:word', examples.get);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
