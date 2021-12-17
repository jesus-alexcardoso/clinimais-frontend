(function() {
    'use strict';

    angular
        .module('CliniMaisApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$window', '$rootScope'];

    function LoginService($http, $window, $rootScope) {
        var service = {
            login: login
        };

        var URL = 'http://localhost:8080/api/usuarios/login';

        return service;
 
        function login(record) {
            return $http.post(URL, record);
        }
    }
})();