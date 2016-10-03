
(function(){
    angular.module('meanApp')
        .service('meanData',meanData);
    meanData.$injector = ['$http','authentication'];
    function meanData($http,authentication){
        var getProfile = function(){
            //console.log('inside getProfile() of meanData Service');
            //console.log('in meanData service -->authentication.getToken()---------->'+authentication.getToken());
            return $http.get('/profile',{
                header:{
                    Authorization:'Bearer ' + authentication.getToken()

                }
            });
        };
        return {
            getProfile :getProfile
        };
    }
})();


