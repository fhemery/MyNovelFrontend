angular.module('myNovel.novelEdit').component('editScene', {
    templateUrl: 'app/components/novelEdit/editScene/editScene.html',
    controller : editSceneCtrl
});

function editSceneCtrl($scope, toastr, editContext){
    var self = this;

    self.loadScene = function(screen){
        self.scene = editContext.getActiveObject();
    };
    editContext.registerForScreenChange(self.loadScene);
}
