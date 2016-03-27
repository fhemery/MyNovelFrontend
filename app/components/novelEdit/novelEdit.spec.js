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
    var novelsService, editContext;
    var toastr;
    var $routeParams, $location;

    beforeEach(module('myNovel.novelEdit'));

    beforeEach(inject(function(_$rootScope_, _novelsService_, _$q_,
        _toastr_, _$routeParams_, _$location_, _editContext_){
        $rootScope = _$rootScope_;
        novelsService = _novelsService_;
        $q = _$q_;
        toastr = _toastr_;
        $routeParams = _$routeParams_;
        $location = _$location_;
        editContext = _editContext_;
    }));

    beforeEach(inject(function($controller){
        $scope = $rootScope.$new();
        createController = function(){
            return $controller('novelEditCtrl', {
                '$scope': $scope,
                'novelsService': novelsService,
                '$routeParams': {novelId: 10},
                'editContext': editContext
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

        it('should show default screen', function(){
            expect($scope.currentScreen).toEqual('default');
        });

        describe('When successfully fetching novel', function(){
            beforeEach(function(){
                spyOn(editContext, 'setNovel');
                spyOn(editContext, 'registerForNovelChange');
                resolvePromise(novelsServicePromise, true, successfulNovelsServiceResponse);
            });

            it('should go and fetch the novel by the service', function(){
                expect($scope.novel.novelId).toEqual(10);
            });

            it('should display a toastr', function(){
                expect(toastr.success).toHaveBeenCalled();
            });

            it('should set up the editContext\'s novel', function(){
                expect(editContext.setNovel).toHaveBeenCalled();
            });

            it('should register to further updates on novel', function(){
                expect(editContext.registerForNovelChange).toHaveBeenCalled();
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

    describe('showAddChapter function', function(){
        beforeEach(function(){
            spyOn(editContext, 'setCurrentScreen').and.callThrough();
            $scope.showAddChapter();
        });

        it('should set currentScreen to addChapter', function(){
            expect($scope.currentScreen).toBe('addChapter');
        });

        it('should call the editContext', function(){
            expect(editContext.setCurrentScreen).toHaveBeenCalledWith('addChapter');
        });
    });

    describe('manageNovel change function', function(){
        it('should set the scope novel', function(){
            $scope.manageNovelChange({id:10}, '');
            expect($scope.novel.id).toEqual(10);
        });
    });
});
