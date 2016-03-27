describe('component : addChapter', function(){
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
    var chaptersService, $q, toastr;

    beforeEach(module('myNovel.novelEdit'));
    beforeEach(module('myNovel.service.novelEditContext'));

    beforeEach(inject(function(_$rootScope_, _$componentController_,
        _editContext_, _chaptersService_, _$q_, _toastr_){
        $rootScope = _$rootScope_;
        toastr = _toastr_;
        scope = $rootScope.$new();
        $q = _$q_;
        $componentController = _$componentController_;
        editContext = _editContext_;
        chaptersService = _chaptersService_;
        component = $componentController('addChapter', {$scope: scope, editContext: editContext});
    }));

    describe('function addChapter()', function(){
        var chaptersServicePromise;
        var validResponse = {id: 9};
        beforeEach(function(){
            chaptersServicePromise = $q.defer();

            spyOn(chaptersService, 'create').and.returnValue(chaptersServicePromise.promise);
            spyOn(toastr, 'success');
            spyOn(editContext, 'setCurrentScreen');
            spyOn(editContext, 'addChapter');

            component.addChapter(1, {title: 't'});
            resolvePromise(chaptersServicePromise, true, validResponse);
        });

        it('should call the chaptersService', function(){
            expect(chaptersService.create).toHaveBeenCalled();
        });

        it('should display a toastr', function(){
            expect(toastr.success).toHaveBeenCalled();
        });

        it('should push the chapter in the novel', function(){
            expect(editContext.addChapter).toHaveBeenCalledWith(validResponse);
        });

        it('should get back to default screen', function(){
            expect(editContext.setCurrentScreen).toHaveBeenCalled();
        });
    });

    describe('function back()', function(){
        beforeEach(function(){
            spyOn(editContext, 'setCurrentScreen');
        });
        it('should send back to the main novel edit screen', function(){
            component.back();
            expect(editContext.setCurrentScreen).toHaveBeenCalledWith('default');
        });
    });
});
