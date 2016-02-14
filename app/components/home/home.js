
angular.module('myNovel.home', ['ngRoute', 'restangular'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/home/home.html',
        controller: 'homeCtrl'
    });
}).controller('homeCtrl', function ($scope) {

});
