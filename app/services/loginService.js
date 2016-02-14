angular.module('myNovel.service.login', ['restangular', 'base64'])
.factory('loginService', function ($base64, Restangular) {
    return {
        log: log,
        getCurrent: getCurrentUser
    };

    function log(login, password){
        var encoded = $base64.encode(login + ':' + password);
        var authEncoded = 'Basic ' + encoded;
        Restangular.setDefaultHeaders({'Authorization' : authEncoded});
        return Restangular.one('').get();
    }

    function getCurrentUser(){
        return Restangular.one('auth').one('current').get();
    }

});
