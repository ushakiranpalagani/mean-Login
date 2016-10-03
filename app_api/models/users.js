var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        unique:false,
        required:true
    },
    hash:String,
    salt:String

});

userSchema.methods.setPassword = function(password){
    //console.log('Inside setPassword()--->'+password)
    this.salt = crypto.randomBytes(16).toString('hex');
    //console.log('salt generated---->'+JSON.stringify(this.salt));
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    //console.log('hash generates----->'+JSON.stringify(this.hash));
};

userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name,
        exp:parseInt(expiry.getTime()/1000),
    },'MY_SECRET');
};
mongoose.model("User",userSchema);