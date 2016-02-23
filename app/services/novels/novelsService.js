angular.module('myNovel.service.novels', ['restangular'])
.factory('novelsService', function (Restangular) {
    return {
        getAll: getAll,
        get: get,
        create : create
    };

    function getAll(){
        return Restangular.one('novel/').get();
    }

    function create(novel){
        return Restangular.one('novel/').post('', {title: novel.title, summary: novel.summary});
    }

    function get(novelId){
        return Restangular.one('novel', novelId).get();
    }

});
