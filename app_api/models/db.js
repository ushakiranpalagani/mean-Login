var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/MEAN';

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);
mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to '+dbURI);
});
mongoose.connection.on('error',function(error){
    console.log('mongoose connection error '+error);
});
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg,callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through '+msg);
    });
};

process.once('SIGUSR2',function(){
    gracefulShutdown('nodemon restart',function(){
        process.kill(process.pid,'SIGUSR2');
    });
});
process.on('SIGINT',function(){
    gracefulShutdown('app termination',function(){
        process.exit(0);
    });
});

/*For Heroku termination*/

process.on('SIGTERM',function(){
    gracefulShutdown('Heroku app Termination',function(){
        process.exit(0);
    });
});
require('./users');
