(function() {
    "use strict";

    angular.module("CliniMaisApp").controller("HomeController", HomeController);

    HomeController.$inject = ["$rootScope", "$location", "$window"];

    function HomeController($rootScope, $location, $window) {
        var vm = this;
        var itemSelecionado = -1;

        vm.pacientesPage = pacientesPage;
        vm.profissionaisPage = profissionaisPage;

        activate();

        function activate() {
        }

        function pacientesPage() {
            $location.path("/paciente");
        }

        function profissionaisPage() {
            $location.path("/profissional");
        }
    }
})();