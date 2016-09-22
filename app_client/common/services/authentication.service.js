
(function(){
    angular.module('meanApp',[])
        .service('authentication',authentication);
    authentication.$inject  = ['$http','$window'];
    function authentication($http,$window){
        var saveToken = function(token){
            $window.localStorage['mean-token'] = token;
        }
        var getToken = function () {

            return $window.localStorage['mean-token'];
        }
        var isLoggedIn = function(){
            var token = getToken();
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
            if(isLoggedIn){
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
        register = function(user){
            return $http.post('/api/register',user).success(function(data){
                saveToken(data);
            });
        };
        login = function(user){
            return $http.post('/api/login',user).success(function(data){
                saveToken(data);
            });
        };
        logout = function() {
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
