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

    ctrl.showAddChapter = function(){
        console.log('Changing screen');
        editContext.setCurrentScreen('addChapter');
    };
    editContext.registerForNovelChange(ctrl.manageNovelUpdates);
}
