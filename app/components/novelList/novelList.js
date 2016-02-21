angular.module('myNovel.novelList', ['ngRoute', 'toastr', 'myNovel.service.novels'])
.config(function($routeProvider){
    $routeProvider.when('/novels', {
        templateUrl : 'app/components/novelList/novelList.html',
        controller: 'novelListCtrl'
    });
})
.controller('novelListCtrl', function ($scope, toastr, novelsService) {
    $scope.novels = [];

    novelsService.getAll().then(function(novels){
        $scope.novels = novels;
    });
});
