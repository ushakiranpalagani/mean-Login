
(function(){
    angular.module('meanApp')
        .controller('registerCtrl',registerCtrl);
    registerCtrl.$inject = ['$scope','$location','authentication'];
    function registerCtrl($scope,$location,authentication){
        var vm=this;
        vm.credentials = {
            name:"",
            email:"",
            password:""
        };
        
        vm.onSubmit = function(){
            /*console.log('Submitting Registration--->'+vm.credentials.email);
            console.log('checking $scope'+vm.credentials.name);
            console.log('checking $scope'+vm.credentials.email);
            console.log('checking $scope'+vm.credentials.password);*/

            authentication
                .register(vm.credentials)
                .then(function(){
                    /*console.log('inside success of registration client');
                    console.log('$location.path()----->'+$location.path());*/
                    $location.path('profile');
                })
                .catch(function(err){
                    console.log(err);
                })
            ;

        };
    }
})();
