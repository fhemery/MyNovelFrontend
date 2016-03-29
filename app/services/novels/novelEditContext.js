angular.module('myNovel.service.novelEditContext', [])
.factory('editContext', function () {

    /*********** SCREEN MANAGEMENT ****************/
    var currentScreenModificationCallbacks = [];
    var currentScreen = 'default';
    var allowedScreenValues = ['default', 'addChapter'];
    var getCurrentScreen = function(){
        return currentScreen;
    };

    var setCurrentScreen = function(newScreen){
        var oldStep = currentScreen;
        if (allowedScreenValues.indexOf(newScreen) !== -1){
            currentScreen = newScreen;
        }
        if (currentScreen !== oldStep){
            for (var i = 0; i < currentScreenModificationCallbacks.length; ++i){
                currentScreenModificationCallbacks[i](currentScreen);
            }
        }
    };

    var registerForScreenChange = function(callback){
        currentScreenModificationCallbacks.push(callback);
    };

    /**************** NOVEL MANAGEMENT ****************/
    var currentNovel = null;
    var currentNovelModificationCallbacks = [];

    var filterByChapterId = function(chapter){
        return chapter.chapterId === this.valueOf();
    };

    var notifyCallbacksOfNovelChange = function(action){
        for (var i = 0; i < currentNovelModificationCallbacks.length; ++i){
            currentNovelModificationCallbacks[i](currentNovel, action);
        }
    };

    var addChapter = function(chapter){
        currentNovel.chapters.push(chapter);
        notifyCallbacksOfNovelChange('chapter::add');
    };

    var getNovel = function(novel){
        return currentNovel;
    };

    var setNovel = function(novel){
        currentNovel = novel;
        notifyCallbacksOfNovelChange('novel::set');
    };

    var updateChapter = function(newChapter){
        var chapters = currentNovel.chapters;
        var chapter = chapters.filter(filterByChapterId, newChapter.chapterId);
        if (chapter.length > 0){
            chapters[chapters.indexOf(chapter[0])] = newChapter;
        }
    };

    var registerForNovelChange = function(callback){
        currentNovelModificationCallbacks.push(callback);
    };

    return {
        getCurrentScreen : getCurrentScreen,
        setCurrentScreen : setCurrentScreen,
        registerForScreenChange : registerForScreenChange,
        addChapter: addChapter,
        getNovel: getNovel,
        setNovel: setNovel,
        updateChapter: updateChapter,
        registerForNovelChange: registerForNovelChange
    };
});
