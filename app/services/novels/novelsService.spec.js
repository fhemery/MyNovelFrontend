describe('myNovel.service.novels', function(){

    var $httpBackend, novelsService, Restangular;

    beforeEach(module('myNovel.service.novels'));

    beforeEach(inject(function(_$httpBackend_, _novelsService_, _Restangular_){
        $httpBackend = _$httpBackend_;
        novelsService = _novelsService_;
        Restangular = _Restangular_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getAll function', function(){
        it('should call /novels/ GET verb', function(){
            $httpBackend
            .expectGET('/novel/')
            .respond([]);
            novelsService.getAll();
            $httpBackend.flush();
        });
    });
});
