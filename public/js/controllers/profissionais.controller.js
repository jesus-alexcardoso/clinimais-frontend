(function() {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("ProfissionalListController", ProfissionalListController);

        ProfissionalListController.$inject = ["ProfissionalService"];

    function ProfissionalListController(ProfissionalService) {
        var vm = this;

        vm.item = null;
        vm.itens = [];
        vm.busca = "";
        vm.remover = remover;
        vm.buscar = activate;

        activate();

        function activate() {
            var query = vm.busca ? { $text: { $search: vm.busca } } : {};
            ProfissionalService.find(query).then(function(result) {
                vm.itens = result.data;
            });
        }

        function remover(item) {
            ProfissionalService.remove(item.id).success(function() {
                activate();
            });
        }
    }
})();