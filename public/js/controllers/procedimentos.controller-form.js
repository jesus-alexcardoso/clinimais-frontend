(function () {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("ProcedimentoFormController", ProcedimentoFormController);

    ProcedimentoFormController.$inject = [
        "ProcedimentoService",
        "$location",
        "$routeParams",
        "$scope",
    ];

    function ProcedimentoFormController(
        ProcedimentoService,
        $location,
        $routeParams
    ) {
        var vm = this;
        vm.procedimento = {};
        vm.titulo = "Novo Procedimento";
        vm.item = null;
        vm.salvar = salvar;

        activate();

        function activate() {
            if ($routeParams.id) {
                ProcedimentoService.findById($routeParams.id).success(function (data) {
                    vm.procedimento = data;
                    vm.titulo = "Editando Procedimento";
                });
            }
        }

        function salvar() {
            ProcedimentoService.save(vm.procedimento).success(function () {
                $location.path("/procedimento");
                alert("Procedimento cadastrado com sucesso!!");
            }).error(function (erro) {
                alert(JSON.stringify(erro));
            });
        }

    

    }
})();