describe('myNovel.service.chapters', function(){

    var $httpBackend, chaptersService, Restangular;

    beforeEach(module('myNovel.service.chapters'));

    beforeEach(inject(function(_$httpBackend_, _chaptersService_, _Restangular_){
        $httpBackend = _$httpBackend_;
        chaptersService = _chaptersService_;
        Restangular = _Restangular_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('create function', function(){
        it('should call /novel/<id>/chapter POST verb', function(){
            $httpBackend
            .expectPOST('/novel/1/chapter/')
            .respond([]);
            chaptersService.create(1, {title:'title', summary:'summary'});
            $httpBackend.flush();
        });
    });

    describe('getChapterDetails function', function(){
        it('should call /novel/<id>/chapter/<id> GET verb', function(){
            $httpBackend
            .expectGET('/novel/1/chapter/2')
            .respond({});
            chaptersService.getChapterDetails(1, 2);
            $httpBackend.flush();
        });
    });
});
