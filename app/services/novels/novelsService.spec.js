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
        it('should call /novel/ GET verb', function(){
            $httpBackend
            .expectGET('/novel/')
            .respond([]);
            novelsService.getAll();
            $httpBackend.flush();
        });
    });

    describe('create function', function(){
        it ('should call /novel/ POST verb', function(){
            $httpBackend
                .expectPOST('/novel/')
                .respond({});
            novelsService.create({title: 't'});
            $httpBackend.flush();
        });
    });

    describe('get function', function(){
        it('should call /novel/{id} GET verb', function(){
            $httpBackend
                .expectGET('/novel/10')
                .respond({});
            novelsService.get(10);
            $httpBackend.flush();
        });
    });
});
