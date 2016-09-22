
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
    var user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);
    user.save(function(err){
        var token;
        token = user.generateJWT();
        res.status(200);
        res.json({
            "token":token
        });
    });

};
module.exports.login = function(req,res){
    /*if(!req.body.email || !req.body.password){
        sendJSONResponse(res,400,{
            message:'Both email and password are required for signing in!!'
        });
        return;
    }*/
    passport.authenticate('local',function(err,user,info){
        if(err){
            res.status(400).json(err);
            return;
        }
        if(user){
            token = user.generateJWT();
            res.status(200);
            res.json({
                "token":token
            });

        }else{
            res.status(400).json(info);
        }
    })(req,res);
};
