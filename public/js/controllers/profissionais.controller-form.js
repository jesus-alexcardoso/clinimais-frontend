(function () {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("ProfissionalFormController", ProfissionalFormController);

        ProfissionalFormController.$inject = [
        "ProfissionalService",
        "$location",
        "$routeParams",
        "$scope",
    ];

    function ProfissionalFormController(
        ProfissionalService,
        $location,
        $routeParams
    ) {
        var vm = this;
        vm.paciente = {};
        vm.titulo = "Novo Profissional";
        vm.item = null;
        vm.salvar = salvar;

        activate();

        function activate() {
            if ($routeParams.id) {
                ProfissionalService.findById($routeParams.id).success(function (data) {
                    vm.profissional = data;
                    vm.titulo = "Editando Profissional";
                });
            }
        }

        function salvar() {
            ProfissionalService.save(vm.profissional).success(function () {
                $location.path("/profissional");
                alert("Profissional cadastrado com sucesso!!");
            }).error(function (erro) {
                alert(JSON.stringify(erro));
            });
        }

    

    }
})();