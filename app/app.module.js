angular.module('myNovel', ['myNovel.home', 'myNovel.common',
               'myNovel.login', 'myNovel.signup',
               'myNovel.novelList', 'myNovel.novelCreate', 'ui.bootstrap'])
.config(function(RestangularProvider, $routeProvider, $locationProvider, $tooltipProvider){
    RestangularProvider.setBaseUrl('http://www.mynovel.loc:8080/api/');
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(false);

    $tooltipProvider.options({
        placement: 'top',
        animation: true,
        popupDelay: 0,
        appendToBody: false
    });
})
.controller('rootCtrl', function($rootScope, $scope, $location){

    // Manage the login in the top most scope, so that all scopes benefit from the user info.
    $rootScope.$on('user:login', function(event, user){
        $scope.user = user;
        if ($location.path() === '/'){
            console.log('Relocating');
            $location.path('/novels');
        }
    });

});
