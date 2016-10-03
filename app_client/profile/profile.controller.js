
(function(){
    angular.module('meanApp')
        .controller('profileCtrl',profileCtrl);
    profileCtrl.$injector = ['$location','meanData','authentication'];
    function profileCtrl($location,meanData,authentication){
        //console.log('inside profileCtrl---->');
        var vm = this;
        vm.user = {};
        meanData.getProfile()
            .success(function(data){
                
                vm.user = authentication.currentUser();
                //console.log('inside success of meanData.getProfile()--->'+JSON.stringify(vm.user));
        })
            .error(function(e){
                console.log('error in profile controller'+e);
            });
    }
})();
