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
        it('should perform a call to /novel/{novelId}/scene/ POST verb', function(){
            $httpBackend
            .expectPOST('/novel/12/scene/')
            .respond({});
            scenesService.create(12, {});
        });
    });

    describe('update function', function(){
        it('should perform a call to /novel/{novelId}/scene/{sceneId} PUT verb', function(){
            $httpBackend
            .expectPOST('/novel/12/scene/1')
            .respond({});
            scenesService.update(12, {sceneId: 1});
        });
    });
});
