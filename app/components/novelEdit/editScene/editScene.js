angular.module('myNovel.novelEdit').component('editScene', {
    templateUrl: 'app/components/novelEdit/editScene/editScene.html',
    controller : editSceneCtrl
});

function editSceneCtrl($scope, toastr, editContext, scenesService){
    var self = this;
    self.novelId = null;

    self.loadScene = function(screen){
        self.scene = editContext.getActiveObject();
        self.novelId = editContext.getNovel().novelId;
    };
    editContext.registerForScreenChange(self.loadScene);

    self.save = function(){
        scenesService.update(self.novelId, self.scene).then(function(response){
            toastr.success('Scene saved');
        });
    };
}
