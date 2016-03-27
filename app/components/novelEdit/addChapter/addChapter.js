angular.module('myNovel.novelEdit').component('addChapter', {
    templateUrl: 'app/components/novelEdit/addChapter/addChapter.html',
    controller : addChapterCtrl
});

function addChapterCtrl($scope, toastr, chaptersService, $routeParams, editContext){
    var ctrl = this;

    ctrl.addChapter = function(){
        var newChapter = {title: ctrl.title, summary: ctrl.summary};
        chaptersService.create($routeParams.novelId, newChapter).then(function(chapter){
            toastr.success('Chapter ' + ctrl.title + ' created.');
            editContext.addChapter(chapter);
            ctrl.back();
        });
    };

    ctrl.back = function(){
        editContext.setCurrentScreen('default');
    };
}
