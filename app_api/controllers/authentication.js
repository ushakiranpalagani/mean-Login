
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONResponse = function(res,status,content){
    res.status(status);
    res.json(content);
};
module.exports.register = function(req,res){
    /*if(!req.body.name || !req.body.email || !req.body.password){
        sendJSONResponse(res,400,{
            message:'all fields required'
        });
        return;
    }*/
    //console.log('inside express authentication.register');
    var user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);
    //console.log('before calling save()+user object--->'+JSON.stringify(user));
    user.save(function(err){
        if(err){
            console.log('error in saving to mongo+user+---->'+JSON.stringify(user));
            console.log('error from mongo server-->'+err);
        }
        else{
            var token;
            //console.log('inside the else of callback + user'+JSON.stringify(user));
            token = user.generateJwt();
            //console.log('jwt token--->'+token);

            res.status(200);
            res.json({
                "token":token
            });


        }
    });

};
module.exports.login = function(req,res){
    /*if(!req.body.email || !req.body.password){
        sendJSONResponse(res,400,{
            message:'Both email and password are required for signing in!!'
        });
        return;
    }*/
    var user = new User();
    user.email = req.body.email;
    user.setPassword(req.body.password);
    //console.log('before calling save()+user object--->'+JSON.stringify(user));

    //console.log('inside express authentication.login');
    passport.authenticate('local',function(err,user,info){
        if(err){
            res.status(400).json(err);
            return;
        }
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token":token
            });

        }else{
            res.status(400).json(info);
        }
    })(req,res);
};

