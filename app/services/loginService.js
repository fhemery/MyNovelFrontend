angular.module('myNovel.service.login', ['restangular', 'base64', 'LocalStorageModule'])
.factory('loginService', function ($base64, Restangular, localStorageService) {
    return {
        log: log,
        getCurrent: getCurrentUser
    };

    function log(login, password){
        var encoded = $base64.encode(login + ':' + password);
        var authEncoded = 'Basic ' + encoded;
        // Put in local storage
        if (localStorageService.isSupported) {
            localStorageService.set('EncodedLogin', encoded);
        }
        Restangular.setDefaultHeaders({'Authorization' : authEncoded});
        return Restangular.one('').get();
    }

    function getCurrentUser(){
        var encoded = null;
        if (localStorageService.isSupported){
            encoded = localStorageService.get('EncodedLogin');
            if (encoded !== null){
                var authEncoded = 'Basic ' + encoded;
                Restangular.setDefaultHeaders({'Authorization': authEncoded});
            }
        }
        return Restangular.one('').get();
    }

});
