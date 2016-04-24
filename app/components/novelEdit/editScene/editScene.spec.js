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
    var scenesService, $q, toastr;

    beforeEach(module('myNovel.novelEdit'));
    beforeEach(module('myNovel.service.novelEditContext'));

    beforeEach(inject(function(_$rootScope_, _$componentController_,
        _editContext_, _$q_, _scenesService_, _toastr_){
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $q = _$q_;
        $componentController = _$componentController_;
        editContext = _editContext_;
        scenesService = _scenesService_;
        toastr = _toastr_;
    }));

    var scene = {sceneId: 10};
    beforeEach(function(){
        spyOn(editContext, 'getActiveObject').and.returnValue(scene);
        spyOn(editContext, 'getNovel').and.returnValue({novelId: 1});
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
        beforeEach(function () {
            component.loadScene('editScene');
        });

        it('should fetch the scene from the editContext', function(){
            expect(editContext.getActiveObject).toHaveBeenCalled();
            expect(component.scene).toEqual(scene);
        });

        it('should retrieve the novelId from the editContext', function(){
            expect(editContext.getNovel).toHaveBeenCalled();
            expect(component.novelId).toBe(1);
        });
    });

    describe('function save', function(){
        var scenePromise;
        beforeEach(function(){
            scenePromise = $q.defer();
            spyOn(scenesService, 'update').and.returnValue(scenePromise.promise);
            component.save();
        });

        it('should call the scenesService', function(){
            expect(scenesService.update).toHaveBeenCalled();
        });

        describe('upon success', function(){
            beforeEach(function () {
                spyOn(toastr, 'success');
                resolvePromise(scenePromise, true, {});
            });

            it('should show a toastr', function(){
                expect(toastr.success).toHaveBeenCalled();
            });
        });
    });
});
