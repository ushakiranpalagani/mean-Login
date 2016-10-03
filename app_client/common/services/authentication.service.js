
(function(){
    angular.module('meanApp',['ngRoute'])
        .service('authentication',authentication);
    authentication.$inject  = ['$http','$window'];
    function authentication($http,$window){

        var saveToken = function(token){

            //console.log('inside saveToken()--->'+token);
            $window.localStorage['mean-token'] = token;
        }
        var getToken = function () {
            //console.log('inside the authService.getToken()----->');
            return $window.localStorage['mean-token'];
        }
        var isLoggedIn = function(){
            var token = getToken();
            //console.log('inside isLoggedin()--'+JSON.stringify(token));
            var payLoad;
            if(token){
                payLoad = token.split('.')[1];
                payLoad = $window.atob(payLoad);
                payLoad = JSON.parse(payLoad);
                return payLoad.exp > Date.now()/1000;
            }else{
                return false;
            }

        };
        var currentUser = function(){
            
            if(isLoggedIn()){
                var token = getToken();
                var payLoad = token.split('.')[1];
                payLoad = $window.atob(payLoad);
                payLoad = JSON.parse(payLoad);
                return {
                    email:payLoad.email,
                    name:payLoad.name
                };
            }
        };
        var register = function(user){
            //console.log('Inside authservice.register'+JSON.stringify(user));
            return $http.post('/api/register',user)
                .then(function(data){
                    //console.log('inside success of authService.register--'+JSON.stringify(data));

                    //console.log('retrieving the json data-->'+data["data"]["token"]);

                    saveToken(data["data"]["token"]);
                    //console.log('after calling saveToken()--->');
                })
                .catch(function (data, status) {
                console.error('error in http post---register'+status);
            });
        };
        var login = function(user){
            //console.log('Inside authservice.login'+JSON.stringify(user));

            return $http.post('/api/login',user)
                .then(function(data){
                    //console.log('inside success of authService.register--'+JSON.stringify(data));
                    saveToken(data["data"]["token"]);
                    //console.log('after calling saveToken()--->');
                })
                .catch(function(data,status){
                    console.error("error in $http post--login"+status);
                });
        };
        var logout = function() {
            $window.localStorage.removeItem('mean-token');
        };
        return{
               currentUser:currentUser,
                saveToken:saveToken,
                getToken:getToken,
                isLoggedIn:isLoggedIn,
                register:register,
                login:login,
                logout:logout
        };
    }
})();
