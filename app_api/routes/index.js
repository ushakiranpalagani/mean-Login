var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret:'MY_SECRET',
    userProperty:'payLoad'
});

//console.log('inside index.js--express');
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
router.get('/profile',auth,ctrlProfile.profileRead);
router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);
//console.log('inside express index.js');
module.exports = router;