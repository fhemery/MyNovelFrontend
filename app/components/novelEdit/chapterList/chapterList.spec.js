describe('component : listChapter', function(){

    var component, scope, $componentController, editContext;
    var chaptersService, $q;

    beforeEach(module('myNovel.novelEdit'));
    beforeEach(module('myNovel.service.novelEditContext'));

    beforeEach(inject(function(_$rootScope_, _$componentController_,
        _editContext_, _chaptersService_, _$q_){
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
});
