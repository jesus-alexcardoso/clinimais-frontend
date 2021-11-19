(function() {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("PacienteListController", PacienteListController);

        PacienteListController.$inject = ["PacienteService"];

    function PacienteListController(PacienteService) {
        var vm = this;

        vm.item = null;
        vm.itens = [];
        vm.busca = "";
        vm.remover = remover;
        vm.buscar = activate;

        activate();

        function activate() {
            var query = vm.busca ? { $text: { $search: vm.busca } } : {};
            PacienteService.find(query).then(function(result) {
                vm.itens = result.data;
            });
        }

        function remover(item) {
            PacienteService.remove(item.id).success(function() {
                activate();
            });
        }
    }
})();