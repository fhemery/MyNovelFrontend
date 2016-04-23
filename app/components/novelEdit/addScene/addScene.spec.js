describe('component : addScene', function(){
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
    var scenesService, $q, toastr;

    beforeEach(module('myNovel.novelEdit'));
    beforeEach(module('myNovel.service.novelEditContext'));

    beforeEach(inject(function(_$rootScope_, _$componentController_,
        _editContext_, _scenesService_, _$q_, _toastr_){
        $rootScope = _$rootScope_;
        toastr = _toastr_;
        scope = $rootScope.$new();
        $q = _$q_;
        $componentController = _$componentController_;
        editContext = _editContext_;
        scenesService = _scenesService_;
    }));

    beforeEach(function(){
        spyOn(editContext, 'registerForScreenChange');
        spyOn(editContext, 'getNovel').and.returnValue({novelId: 1});
        component = $componentController('addScene', {$scope: scope,
            editContext: editContext});
    });

    describe('at initialization', function(){

        it('should have empty title and summary', function(){
            expect(component.title).toBe('');
            expect(component.summary).toBe('');
        });

        it('should initialize chapter to empty', function(){
            expect(component.chapter).toBe(null);
        });

        it('should register a callback to the editContext', function(){
            expect(editContext.registerForScreenChange).toHaveBeenCalled();
        });
    });

    describe('function loadScreen', function(){
        var chapter = {chapterId: 1};
        it('should get chapterId if screenName is addScene', function(){
            component.loadScreen('addScene', chapter);
            expect(component.chapter.chapterId).toBe(1);
        });

        it('should not set chapterId if screenName is not addScene', function(){
            component.loadScreen('somethingElse', chapter);
            expect(component.chapter).toBe(null);
        });

        it('should go fetch novelId', function(){
            component.loadScreen('addScene', chapter);
            expect(editContext.getNovel).toHaveBeenCalled();
            expect(component.novelId).toBe(1);
        });
    });

    describe('function addScene', function(){
        var scenePromise;
        beforeEach(function(){
            component.chapter = {chapterId: 1, scenes:[]};
            scenePromise = $q.defer();
            spyOn(scenesService, 'create').and.returnValue(scenePromise.promise);
            spyOn(toastr, 'success');
            component.addScene();
        });

        it('should make a call to the scenesService', function(){
            expect(scenesService.create).toHaveBeenCalled();
        });

        describe('upon success', function(){
            beforeEach(function () {
                spyOn(editContext, 'updateChapter');
                resolvePromise(scenePromise, true, {});
            });

            it('should display a toastr on success', function(){
                expect(toastr.success).toHaveBeenCalled();
            });

            it('should update the novel', function(){
                expect(component.chapter.scenes.length).toBe(1);
            });

            it('should call the context to update the chapter', function(){
                expect(editContext.updateChapter).toHaveBeenCalled();
            });
        });
    });
});
