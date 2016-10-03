

(function(){
    angular.module('meanApp')
        .controller('navigationCtrl',navigationCtrl);
    navigationCtrl.$injector = ['$location','authentication'];
    function navigationCtrl($location,authentication){
        var vm = this;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.logOut = function(){
            authentication.logout();
            $location.path('/');
        }
    }
})();