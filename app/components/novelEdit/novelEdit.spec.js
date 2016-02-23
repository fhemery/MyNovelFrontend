describe('myNovel.novelEdit', function(){
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
    var $routeParams, $location;

    beforeEach(module('myNovel.novelEdit'));

    beforeEach(inject(function(_$rootScope_, _novelsService_, _$q_,
        _toastr_, _$routeParams_, _$location_){
        $rootScope = _$rootScope_;
        novelsService = _novelsService_;
        $q = _$q_;
        toastr = _toastr_;
        $routeParams = _$routeParams_;
        $location = _$location_;
    }));

    beforeEach(inject(function($controller){
        $scope = $rootScope.$new();
        createController = function(){
            return $controller('novelEditCtrl', {
                '$scope': $scope,
                'novelsService': novelsService,
                '$routeParams': {novelId: 10}
            });
        };
    }));

    var novelsServicePromise;
    var successfulNovelsServiceResponse = {novelId: 10};

    beforeEach(function(){
        novelsServicePromise = $q.defer();
        spyOn(novelsService, 'get').and.returnValue(novelsServicePromise.promise);
        spyOn(toastr, 'success');
        spyOn(toastr, 'error');
    });

    beforeEach(function(){
        createController();
    });

    describe('at initialization', function(){
        it('should initialize the novel Id', function(){
            expect($scope.novelId).toBe(10);
        });

        it('should set novel as empty object', function(){
            expect($scope.novel).toEqual({});
        });

        describe('When successfully fetching novel', function(){
            beforeEach(function(){
                resolvePromise(novelsServicePromise, true, successfulNovelsServiceResponse);
            });

            it('should go and fetch the novel by the service', function(){
                expect($scope.novel.novelId).toEqual(10);
            });

            it('should display a toastr', function(){
                expect(toastr.success).toHaveBeenCalled();
            });
        });

        describe('When receiving an error', function(){
            beforeEach(function(){
                spyOn($location, 'path');
                resolvePromise(novelsServicePromise, false, {});
            });

            it('should display an error with toastr', function(){
                expect(toastr.error).toHaveBeenCalled();
            });

            it('should call location', function(){
                expect($location.path).toHaveBeenCalledWith('/novels');
            });
        });
    });
});
