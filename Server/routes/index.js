
var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
    // console.log(req);
    res.send("API is working properly. Hello!");
    // res.render('index', { title: 'Express'});
    
});

module.exports = router;