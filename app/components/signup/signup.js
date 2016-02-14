angular.module('myNovel.signup', ['ngRoute', 'toastr', 'myNovel.service.account'])
.config(function ($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: 'app/components/signup/signup.html',
        controller: 'signupCtrl'
    });
}).controller('signupCtrl', function ($scope, accountService, toastr) {
    $scope.subscribeSuccessful = false;

    $scope.submitForm = function (isValid) {
        if (isValid) {
            if ($scope.newUser.password !== $scope.newUser.password2) {
                $scope.errorIdenticalPwd = true;
            }

            accountService.create($scope.newUser).then(function (result) {
                $scope.subscribeSuccessful = true;
            }, function (errorRequest) {
                if (errorRequest.status === 400){
                    var report = errorRequest.data.report;
                    if (report !== undefined){
                        $scope.errors = {};
                        for (var i = 0; i < report.errors.length; ++i){
                            console.log(report.errors[i]);
                            if (report.errors[i] === 'ACCOUNT_LOGIN_EXISTS'){
                                $scope.errors.loginExists = true;
                            }
                            else if (report.errors[i] === 'ACCOUNT_EMAIL_EXISTS'){
                                $scope.errors.emailExists = true;
                            }
                        }
                    }
                }
                else {
                    toastr.error('Error while trying to contact server', 'Error');
                }
            });

        }
    };
});
