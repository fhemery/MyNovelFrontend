describe('myNovel.novelList', function(){
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
    var $scope, $q, novelsController;
    var novelsService;
    var toastr;
    var $location;

    beforeEach(module('myNovel.novelList'));

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
            return $controller('novelListCtrl', {
                '$scope': $scope,
                'novelsService': novelsService
            });
        };
    }));

    var novelsServicePromise;
    var novelsApiResponse = [{title: 'Title', lastModification:'1454962581000'}];

    beforeEach(function(){
        novelsServicePromise = $q.defer();
        spyOn(novelsService, 'getAll').and.returnValue(novelsServicePromise.promise);
        spyOn($location, 'path');
    });

    beforeEach(function(){
        createController();
    });

    describe('at initialization', function(){
        it('should initialize novels as an empty list', function(){
            expect($scope.novels).toEqual([]);
        });

        it('should fetch the novels', function(){
            resolvePromise(novelsServicePromise, true, novelsApiResponse);
            expect($scope.novels.length).toBe(1);
        });
    });

    describe('function selectNovel', function(){
        it('should redirect to selecting novel', function(){
            $scope.selectNovel(10);
            expect($location.path).toHaveBeenCalledWith('/novel/10');
        });
    });
});
