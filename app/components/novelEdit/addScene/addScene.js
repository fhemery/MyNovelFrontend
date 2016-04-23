angular.module('myNovel.novelEdit').component('addScene', {
    templateUrl: 'app/components/novelEdit/addScene/addScene.html',
    controller : addSceneCtrl
});

function addSceneCtrl($scope, toastr, scenesService, editContext){
    var ctrl = this;
    ctrl.title = '';
    ctrl.summary = '';
    ctrl.chapter = null;

    ctrl.loadScreen = function(screenName, obj){
        if (screenName === 'addScene'){
            ctrl.chapter = obj;
        }
        ctrl.novelId = editContext.getNovel().novelId;
    };

    editContext.registerForScreenChange(ctrl.loadScreen);

    ctrl.addScene = function(){
        scenesService.create(ctrl.novelId, {
            title: ctrl.title,
            summary: ctrl.summary,
            chapterId: ctrl.chapter.chapterId
        }).then(function(response){
            toastr.success('Scene succesfully created!');
            ctrl.chapter.scenes.push(response);
            editContext.updateChapter(ctrl.chapter);
        });
    };
}
