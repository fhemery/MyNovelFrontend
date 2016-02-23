angular.module('myNovel.novelCreate', ['ngRoute', 'toastr', 'myNovel.service.novels'])
.config(function($routeProvider){
    $routeProvider.when('/novel/create', {
        templateUrl : 'app/components/novelCreate/novelCreate.html',
        controller: 'novelCreateCtrl'
    });
})
.controller('novelCreateCtrl', function ($scope, toastr, novelsService, $location) {
    $scope.title = '';
    $scope.summary = '';

    $scope.createNovel = function(){
        var newNovel = {title: $scope.title, summary: $scope.summary};
        novelsService.create(newNovel).then(function(response){
            toastr.success('Novel created');
            $location.path('/novels');
        });
    };
});
