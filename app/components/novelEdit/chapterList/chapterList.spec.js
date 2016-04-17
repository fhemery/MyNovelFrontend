describe('component : listChapter', function(){

    var $rootScope;
    var resolvePromise = function(promise, isSuccess, value){
        if (isSuccess){
            promise.resolve(value);
        } else {
            promise.reject(value);
        }
        $rootScope.$digest();
    };

    var component, scope, $componentController, editContext;
    var chaptersService, $q;

    beforeEach(module('myNovel.novelEdit'));
    beforeEach(module('myNovel.service.novelEditContext'));

    beforeEach(inject(function(_$rootScope_, _$componentController_,
        _editContext_, _chaptersService_, _$q_){
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $q = _$q_;
        $componentController = _$componentController_;
        editContext = _editContext_;
        chaptersService = _chaptersService_;
    }));

    describe('At initialization', function(){
        beforeEach(function(){
            spyOn(editContext, 'registerForNovelChange');
            component = $componentController('listChapter',
                {$scope: scope, editContext: editContext});
        });
        it('should have empty novel', function(){
            expect(component.novel).toBe(null);
        });
        it('should subscribe to editContext novel changes', function(){
            expect(editContext.registerForNovelChange).toHaveBeenCalled();
        });
    });

    describe('function manageNovelUpdates', function(){
        it('should update the novel used', function(){
            var newNovel = {novelId: 5};
            component = $componentController('listChapter', {$scope: scope});
            component.manageNovelUpdates(newNovel);

            expect(component.novel).toBe(newNovel);
        });
    });

    describe('showAddChapter function', function(){
        beforeEach(function(){
            spyOn(editContext, 'setCurrentScreen');
            component = $componentController('listChapter',
                {$scope: scope, editContext: editContext});
            component.showAddChapter();
        });

        it('should call the editContext', function(){
            expect(editContext.setCurrentScreen).toHaveBeenCalledWith('addChapter');
        });
    });

    describe('loadChapterDetails function', function(){
        var loadChapterPromise;
        var successPromiseResult = {chapterId: 2, scenes: [{}]};

        beforeEach(function(){
            loadChapterPromise = $q.defer();
            spyOn(chaptersService, 'getChapterDetails').and.returnValue(loadChapterPromise.promise);
            spyOn(editContext, 'updateChapter');

            component = $componentController('listChapter', {
                $scope: scope,
                chaptersService: chaptersService,
                editContext: editContext
            });

            component.novel = {
                novelId: 1,
                chapters: [
                    {chapterId: 1, scenes: [{}]},
                    {chapterId: 2, scenes: null}
                ]
            };
        });

        it('should load details of chapters if scenes have not been loaded', function(){
            component.loadChapterDetails(2);
            expect(chaptersService.getChapterDetails).toHaveBeenCalledWith(1, 2);
        });

        it('should not load details if details have already been loaded', function(){
            component.loadChapterDetails(1);
            expect(chaptersService.getChapterDetails).not.toHaveBeenCalled();
        });

        it('should update the chapter with the response', function(){
            component.loadChapterDetails(2);
            resolvePromise(loadChapterPromise, true, successPromiseResult);

            expect(editContext.updateChapter).toHaveBeenCalledWith(successPromiseResult);
        });

    });

    describe('displayScene function', function(){
        beforeEach(function(){
            spyOn(editContext, 'setCurrentScreen');

            component = $componentController('listChapter', {
                $scope: scope,
                chaptersService: chaptersService,
                editContext: editContext
            });
        });

        it('should set current Screen to scene details', function(){
            var scene = {};
            component.displayScene(scene);
            expect(editContext.setCurrentScreen).toHaveBeenCalledWith('editScene', scene);
        });
    });
});
