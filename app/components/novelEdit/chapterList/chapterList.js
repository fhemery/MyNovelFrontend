angular.module('myNovel.novelEdit').component('listChapter', {
    templateUrl: 'app/components/novelEdit/chapterList/chapterList.html',
    controller : listChapterCtrl
});

function listChapterCtrl($scope, toastr, chaptersService, $routeParams, editContext){
    var ctrl = this;
    ctrl.novel = null;

    ctrl.manageNovelUpdates = function(novel, action){
        ctrl.novel = novel;
    };

    var filterByChapterId = function(chapter){
        return chapter.chapterId === this.valueOf();
    };

    ctrl.loadChapterDetails = function(chapterId){
        console.log('loading details for ' + chapterId);
        var chapter = ctrl.novel.chapters.filter(filterByChapterId, chapterId);
        if (chapter.length === 1 && chapter[0].scenes.length === 0){
            chaptersService.getChapterDetails(ctrl.novel.novelId,
                chapterId).then(function(response){
                editContext.updateChapter(response);
            });
        }
    };

    ctrl.showAddChapter = function(){
        editContext.setCurrentScreen('addChapter');
    };
    editContext.registerForNovelChange(ctrl.manageNovelUpdates);
}
