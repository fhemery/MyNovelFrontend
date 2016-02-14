describe('myNovel.login', function(){
    var $rootScope;
    var resolvePromise = function(promise, isSuccess, value){
        if (isSuccess){
            promise.resolve(value);
        } else {
            promise.reject(value);
        }
        $rootScope.$digest();
    };

    var createController;
    var $scope, $q, loginController;
    var loginService;
    var toastr;

    beforeEach(module('myNovel.login'));
    beforeEach(module('myNovel.service.login'));

    beforeEach(inject(function(_$rootScope_, _loginService_, _$q_, _toastr_){
        $rootScope = _$rootScope_;
        loginService = _loginService_;
        $q = _$q_;
        toastr = _toastr_;
    }));

    beforeEach(inject(function($controller){
        $scope = $rootScope.$new();
        createController = function(){
            return $controller('loginCtrl', {
                '$scope': $scope,
                'loginService': loginService
            });
        };
    }));

    beforeEach(function(){
        spyOn(loginService, 'getCurrent').and.returnValue($q.defer().promise);
        createController();
    });
});
