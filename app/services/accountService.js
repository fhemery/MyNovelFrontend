angular.module('myNovel.service.account', ['restangular'])
.factory('accountService', function (Restangular) {
    return {
        get: get,
        create: create
    };

    function get(userId){
        return Restangular.one('account', userId).get();
    }

    function create(user){
        return Restangular.one('account').post('', {newUser: user});
    }
});
