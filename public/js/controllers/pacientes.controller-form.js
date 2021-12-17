(function () {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("PacienteFormController", PacienteFormController);

    PacienteFormController.$inject = [
        "PacienteService",
        "$location",
        "$routeParams",
        "$scope",
    ];

    function PacienteFormController(
        PacienteService,
        $location,
        $routeParams
    ) {
        var vm = this;
        vm.paciente = {};
        vm.titulo = "Novo Paciente";
        vm.item = null;
        vm.salvar = salvar;

        activate();

        function activate() {
            if ($routeParams.id) {
                PacienteService.findById($routeParams.id).success(function (data) {
                    vm.paciente = data;
                    vm.titulo = "Editando Paciente";
                });
            }
        }

        function salvar() {
            PacienteService.save(vm.paciente).success(function () {
                $location.path("/paciente");
                alert("Paciente cadastrado com sucesso!!");                
            }).error(function (erro) {
                alert(JSON.stringify(erro));
            });
        }

    

    }
})();