describe('service: novelEditContext', function(){
    var editContext;

    beforeEach(module('myNovel.service.novelEditContext'));
    beforeEach(inject(function($injector){
        editContext = $injector.get('editContext');
    }));

    var self;
    beforeEach(function(){
        self = this;
        self.callback = function(){};

        spyOn(self, 'callback');
    });

    describe('at initialization', function(){
        it('should initialize current screen to default', function(){
            expect(editContext.getCurrentScreen()).toEqual('default');
        });
        it('should initialize active object to null', function(){
            expect(editContext.getActiveObject()).toBe(null);
        });
    });

    describe('function setCurrentScreen', function(){

        beforeEach(function(){
            editContext.registerForScreenChange(self.callback);
        });

        it('should change if value is allowed', function(){
            editContext.setCurrentScreen('addChapter');
            expect(editContext.getCurrentScreen()).toEqual('addChapter');
        });

        it('should not change value if value provided is not allowed', function(){
            editContext.setCurrentScreen('addChapter');
            editContext.setCurrentScreen('SomethingWrong');
            expect(editContext.getCurrentScreen()).toEqual('addChapter');
        });

        it('should not call registered callbacks when not changing state', function(){
            editContext.setCurrentScreen('default');
            expect(self.callback).not.toHaveBeenCalled();
        });

        it('should call the registered callbacks when changing state', function(){
            editContext.setCurrentScreen('addChapter');
            expect(self.callback).toHaveBeenCalled();
        });

        it('should set active object when called', function(){
            editContext.setCurrentScreen('editScene', {});
            expect(editContext.getActiveObject()).toEqual({});
        });
    });

    describe('function getNovel', function(){
        it('should return null by default', function(){
            expect(editContext.getNovel()).toBe(null);
        });
    });

    describe('function setNovel', function(){
        it('should change the novel', function(){
            var novel = {id:5};
            editContext.setNovel(novel);
            expect(editContext.getNovel()).toBe(novel);
        });

        it('should call registered callbacks', function(){
            editContext.registerForNovelChange(self.callback);
            editContext.setNovel({});
            expect(self.callback).toHaveBeenCalled();
        });
    });

    describe('function update chapter', function(){
        it('should replace the chapter', function(){
            var novel = {
                novelId: 5,
                chapters:[
                    {chapterId: 1}
                ]
            };
            var newChapter = {chapterId: 1, scenes: []};
            editContext.setNovel(novel);
            editContext.updateChapter(newChapter);
            expect(novel.chapters[0].scenes.length).toBe(0);
        });
    });

    describe('function addChapter', function(){
        beforeEach(function(){
            editContext.setNovel({chapters:[]});
        });

        it('should call registered callbacks', function(){
            editContext.registerForNovelChange(self.callback);
            editContext.addChapter({});
            expect(self.callback).toHaveBeenCalled();
        });
    });
});
