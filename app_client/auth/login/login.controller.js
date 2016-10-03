
(function(){
    angular.module('meanApp')
        .controller('loginCtrl',loginCtrl);
    loginCtrl.$inject = ['$location','authentication'];
    function loginCtrl($location,authentication){
        var vm = this;
        vm.credentials = {
            email:"",
            password:""
        };
        vm.onSubmit = function(){
            //console.log('Submitting login--$scope.email--->'+vm.credentials.email);
            //console.log('checking $scope.password'+vm.credentials.password);

            authentication
                .login(vm.credentials)
                .then(function(){
                    $location.path('profile');
                })
                .catch(function(err){
                    alert(err);

                });
        };
    }
})();
