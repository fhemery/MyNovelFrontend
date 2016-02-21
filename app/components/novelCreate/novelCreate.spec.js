describe('myNovel.novelCreate', function(){
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
    var $scope, $q, novelCreateController;
    var novelsService;
    var toastr, $location;

    beforeEach(module('myNovel.novelCreate'));

    beforeEach(inject(function(_$rootScope_, _novelsService_, _$q_, _toastr_, _$location_){
        $rootScope = _$rootScope_;
        novelsService = _novelsService_;
        $q = _$q_;
        toastr = _toastr_;
        $location = _$location_;
    }));

    beforeEach(inject(function($controller){
        $scope = $rootScope.$new();
        createController = function(){
            return $controller('novelCreateCtrl', {
                '$scope': $scope,
                'novelsService': novelsService
            });
        };
    }));

    var novelsServicePromise;
    var novelsApiResponse = {title: 'Title', lastModification:'1454962581000'};

    beforeEach(function(){
        novelsServicePromise = $q.defer();
        spyOn(novelsService, 'create').and.returnValue(novelsServicePromise.promise);
        spyOn($location, 'path');
        spyOn(toastr, 'success');
    });

    beforeEach(function(){
        createController();
    });

    describe('at initialization', function(){

        it('should initialize title and summary variables as empty', function(){
            expect($scope.title).toEqual('');
            expect($scope.summary).toEqual('');
        });
    });

    describe('function createNovel', function(){
        describe('nominal case', function(){
            beforeEach(function(){
                $scope.createNovel('Title', '');
                resolvePromise(novelsServicePromise, true, '{}');
            });

            it('should call the novelsService to create the novel', function(){
                expect(novelsService.create).toHaveBeenCalled();
            });

            it('should relocate to the novel list screen', function(){
                expect($location.path).toHaveBeenCalledWith('#/novels');
            });

            it('should open a toastr', function(){
                expect(toastr.success).toHaveBeenCalled();
            });
        });
    });
});
