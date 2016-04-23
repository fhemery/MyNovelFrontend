angular.module('myNovel.novelEdit').component('listChapter', {
    templateUrl: 'app/components/novelEdit/chapterList/chapterList.html',
    controller : listChapterCtrl
});

function listChapterCtrl($scope, toastr, chaptersService, $routeParams, editContext){
    var ctrl = this;
    ctrl.novel = null;
    ctrl.openedId = 9;

    ctrl.manageNovelUpdates = function(novel, action){
        ctrl.novel = novel;
    };

    var filterByChapterId = function(chapter){
        return chapter.chapterId === this.valueOf();
    };

    ctrl.loadChapterDetails = function(chapterId){
        var chapters = ctrl.novel.chapters.filter(filterByChapterId, chapterId);
        if (chapters.length === 1){
            var chapter = chapters[0];
            if (chapter.scenes === null){
                chaptersService.getChapterDetails(ctrl.novel.novelId,
                    chapterId).then(function(response){
                    editContext.updateChapter(response);
                });
            }
        }
    };

    ctrl.displayScene = function(scene){
        editContext.setCurrentScreen('editScene', scene);
    };

    ctrl.showAddChapter = function(){
        editContext.setCurrentScreen('addChapter');
    };

    ctrl.addScene = function(chapter){
        editContext.setCurrentScreen('addScene', chapter);
    };
    editContext.registerForNovelChange(ctrl.manageNovelUpdates);
}
