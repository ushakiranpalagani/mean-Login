(function(){
    var app = angular.module('meanApp');
        app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
            $routeProvider
                .when('/',{
                    templateUrl:'home/home.view.html',
                    controller:'homeCtrl',
                    controllerAs:'vm'
                })
                .when('/register',{
                    templateUrl:'auth/register/register.view.html',
                    controller:'registerCtrl',
                    controllerAs:'vm'
                })
                .when('/login',{
                    templateUrl:'auth/login/login.view.html',
                    controller:'loginCtrl',
                    controllerAs:'vm'
                })
                .when('/profile',{
                    templateUrl:'profile/profile.view.html',
                    controller:'profileCtrl',
                    controllerAs:'vm'
                })
                .otherwise({
                    redirectTo:'/'
                });
            $locationProvider.html5Mode(true);
        }]);

        app.run(['$rootScope','$location','authentication',run]);
    function run($rootScope,$location,authentication){
            //console.log('inside app.run');
        $rootScope.$on('$routeChangeStart', function(event,nextRoute,currentRoute){
            if($location.path() === '/profile' && !authentication.isLoggedIn()){
                $location.path('/');
            }
        });
    }
})();
