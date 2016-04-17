describe('component : editScene', function(){

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
        _editContext_, _$q_){
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $q = _$q_;
        $componentController = _$componentController_;
        editContext = _editContext_;
    }));

    var scene = {sceneId: 10};
    beforeEach(function(){
        spyOn(editContext, 'getActiveObject').and.returnValue(scene);
        spyOn(editContext, 'registerForScreenChange');
        component = $componentController('editScene', {
            $scope: scope,
            editContext: editContext
        });
    });

    describe('At initialization', function(){
        it('should register a callback to the editContext', function(){
            expect(editContext.registerForScreenChange).toHaveBeenCalled();
        });
    });

    describe('function loadScene', function(){
        it('should fetch the scene from the editContext', function(){
            component.loadScene('editScene');
            expect(editContext.getActiveObject).toHaveBeenCalled();
            expect(component.scene).toEqual(scene);
        });
    });
});
