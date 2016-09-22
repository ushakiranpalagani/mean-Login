var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req,res){
    if(!req.payLoad._id){
        res.status(401).json({
            message:'Unauthorized error: private profile'
        });
    }else{
        User.findById(req.payLoad._id)
    .exec(function(err,user){
            res.status(200).json(user);
        });
    }
}
