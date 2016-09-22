
(function(){
    angular.module('meanApp')
        .service('meanData',meanData);
    meanData.$injector = ['$http','authentication'];
    function meanData($http,authentication){
        var getProfile = function(){
            return $http.get('/api/profile',{
                header:{
                    Authorization:'Bearer ' + authentication.getToken(),

                }
            });
        };
        return {
            getProfile :getProfile
        };
    }
})();


