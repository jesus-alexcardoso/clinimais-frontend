(function() {
    'use strict';
 
    angular
        .module('CliniMaisApp')
        .factory('AgendamentoService', AgendamentoService);
 
    AgendamentoService.$inject = ['$http', '$window', '$rootScope'];
 
    function AgendamentoService($http, $window, $rootScope) {
        var service = {
            find: find,
            findById: findById,
            save: save,
            remove: remove
        };
 
        var URL = 'http://localhost:8080/api/agendamentos';
 
        return service;
 
        function find(query) {
            return $http.get(URL, { params: { filter: JSON.stringify(query) } });
        }
 
        function findById(id) {
            return $http.get(URL + '/' + id);
        }
 
        function save(record) {
            if (record._id) {
                return $http.put(URL + '/' + record._id, record);
            } else {
                return $http.post(URL, record);
            }
        }
 
        function remove(id) {
            return $http.delete(URL + '/' + id);
        }
    }
})();