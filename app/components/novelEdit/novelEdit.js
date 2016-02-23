angular.module('myNovel.novelEdit', ['ngRoute', 'toastr', 'myNovel.service.novels', 'ui.bootstrap'])
.config(function($routeProvider){
    $routeProvider.when('/novel/:novelId', {
        templateUrl : 'app/components/novelEdit/novelEdit.html',
        controller: 'novelEditCtrl'
    });
})
.controller('novelEditCtrl', function ($scope, toastr, novelsService, $routeParams, $location) {
    $scope.novelId = $routeParams.novelId;
    $scope.novel = {};
    $scope.oneAtATime = true;

    novelsService.get($scope.novelId).then(function(response){
        $scope.novel = response;
        toastr.success('Successfully loaded novel');
    }, function(error){
        toastr.error('Could not load novel');
        $location.path('/novels');
    });
});
