(function() {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("ProcedimentoListController", ProcedimentoListController);

        ProcedimentoListController.$inject = ["ProcedimentoService"];

    function ProcedimentoListController(ProcedimentoService) {
        var vm = this;

        vm.item = null;
        vm.itens = [];
        vm.busca = "";
        vm.remover = remover;
        vm.buscar = activate;

        activate();

        function activate() {
            var query = vm.busca ? { $text: { $search: vm.busca } } : {};
            ProcedimentoService.find(query).then(function(result) {
                vm.itens = result.data;
            });
        }

        function remover(item) {
            ProcedimentoService.remove(item.id).success(function() {
                activate();
            });
        }
    }
})();