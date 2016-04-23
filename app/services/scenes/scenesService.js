angular.module('myNovel.service.scenes', ['restangular'])
.service('scenesService', function (Restangular) {
    this.create = function(novelId, scene){
        return Restangular.one('novel', novelId).post('scenes', scene);
    };

});
