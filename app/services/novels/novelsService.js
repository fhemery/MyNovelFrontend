angular.module('myNovel.service.novels', ['restangular'])
.factory('novelsService', function (Restangular) {
    return {
        getAll: getAll
    };

    function getAll(){
        return Restangular.one('novel/').get();
    }

});
