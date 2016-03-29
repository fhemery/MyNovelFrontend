angular.module('myNovel.novelEdit', ['ngRoute', 'toastr',
    'myNovel.service.novels', 'myNovel.service.chapters',
    'ui.bootstrap', 'myNovel.service.novelEditContext'])
.config(function($routeProvider){
    $routeProvider.when('/novel/:novelId', {
        templateUrl : 'app/components/novelEdit/novelEdit.html',
        controller: 'novelEditCtrl'
    });
})
.controller('novelEditCtrl', function ($scope, toastr, novelsService,
    $routeParams, $location, editContext) {
    $scope.novelId = $routeParams.novelId;
    $scope.novel = {};
    $scope.oneAtATime = true;

    $scope.currentScreen = 'default';

    $scope.manageNovelChange = function(newNovel, action){
        $scope.novel = newNovel;
    };

    novelsService.get($scope.novelId).then(function(response){
        $scope.novel = response;
        editContext.setNovel(response);
        editContext.registerForNovelChange($scope.manageNovelChange);
        toastr.success('Successfully loaded novel');
    }, function(error){
        toastr.error('Could not load novel');
        $location.path('/novels');
    });

    // Register callback for status change
    $scope.manageContextChange = function(newScreen){
        $scope.currentScreen = newScreen;
    };
    editContext.registerForScreenChange($scope.manageContextChange);

});
