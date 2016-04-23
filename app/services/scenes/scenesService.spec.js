describe('scenesService', function(){
    var $httpBackend, scenesService, Restangular;

    beforeEach(module('myNovel.service.scenes'));

    beforeEach(inject(function(_$httpBackend_, _scenesService_, _Restangular_){
        $httpBackend = _$httpBackend_;
        scenesService = _scenesService_;
        Restangular = _Restangular_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('create function', function(){
        it('should perform a call to /novel/{novelId}/scenes POST verb', function(){
            $httpBackend
            .expectPOST('/novel/12/scenes')
            .respond({});
            scenesService.create(12, {});
        });
    });
});
