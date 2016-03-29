angular.module('myNovel.login', ['toastr', 'myNovel.service.login', 'LocalStorageModule'])
.directive('loginDirective', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/login/login.html',
        controller: 'loginCtrl'
    };
}).controller('loginCtrl', function($rootScope, $scope, toastr,
    loginService, $location){

    loginService.getCurrent().then(function(user){
        $scope.login = user.username;
        emitLogin($scope.login);
    },
    function(error){
        $location.path('/');
    });

    $scope.log = function(){
        loginService.log($scope.login, $scope.password).then(function () {
            emitLogin($scope.login);
        }, function (error) {
            if (error.status === 401){
                toastr.error('Invalid login');
                $scope.loginError = true;
            }
            else {
                console.log('Error while targeting api');
            }
        });
    };

    function emitLogin(user){
        $rootScope.$emit('user:login', user);
    }
});
