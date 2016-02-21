describe('myNovel.service.login', function(){

    var $httpBackend, loginService, Restangular, localStorageService;

    beforeEach(module('myNovel.service.login'));

    beforeEach(inject(function(_$httpBackend_, _loginService_,
        _Restangular_, _localStorageService_){
        $httpBackend = _$httpBackend_;
        loginService = _loginService_;
        Restangular = _Restangular_;
        localStorageService = _localStorageService_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    beforeEach(function(){
        $httpBackend
            .expectGET('/')
            .respond({});
    });

    describe('login function', function(){
        it('should try to log user by a simple test on the root of the Api', function(){
            loginService.log('login', 'pwd');
            $httpBackend.flush();
        });

        it ('should set a cookie in the local storage', function(){
            loginService.log('login', 'pwd');
            expect(localStorageService.get('EncodedLogin')).toEqual('bG9naW46cHdk');
        });
    });

    describe('getCurrent function', function(){
        it('should send a call to log against the store', function(){
            loginService.getCurrent();
        });
    });
});
