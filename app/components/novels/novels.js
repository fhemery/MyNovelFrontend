angular.module('myNovel.novels', ['ngRoute', 'toastr', 'myNovel.service.novels'])
.config(function($routeProvider){
    $routeProvider.when('/novels', {
        templateUrl : 'app/components/novels/novels.html',
        controller: 'novelsCtrl'
    });
})
.controller('novelsCtrl', function ($scope, toastr, novelsService) {
    $scope.novels = [];

    novelsService.getAll().then(function(novels){
        $scope.novels = novels;
    });
});
