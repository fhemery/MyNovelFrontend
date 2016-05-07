angular.module('myNovel', ['myNovel.home', 'myNovel.common',
               'myNovel.login', 'myNovel.signup',
               'myNovel.novelList', 'myNovel.novelCreate',
               'myNovel.novelEdit', 'ui.bootstrap', 'textAngular'])
.config(function(RestangularProvider, $routeProvider, $locationProvider, toastrConfig, $provide){
    RestangularProvider.setBaseUrl('http://www.mynovel.loc:8080/api/');
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(false);

    angular.extend(toastrConfig, {
        placement: 'top',
        animation: true,
        popupDelay: 0,
        appendToBody: false
    });

    $provide.decorator('taOptions', ['$delegate', function(taOptions) {
        taOptions.toolbar = [
            ['pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
            ['wordcount', 'charcount']
        ];
        return taOptions;
    }]);
})
.controller('rootCtrl', function($rootScope, $scope, $location){

    // Manage the login in the top most scope, so that all scopes benefit from the user info.
    $rootScope.$on('user:login', function(event, user){
        $scope.user = user;
        if ($location.path() === '/'){
            $location.path('/novels');
        }
    });
});
