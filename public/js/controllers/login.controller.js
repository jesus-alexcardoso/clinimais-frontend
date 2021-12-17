(function () {
    "use strict";

    angular
        .module("CliniMaisApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = [
        "LoginService",
        "$location",
        "$routeParams",
        "$scope", 
        "$window"
    ];

    function LoginController(
        LoginService,
        $location,
        $routeParams,
        $scope, 
        $window
    ) {
        var vm = this;
        vm.usuario = {};
        vm.item = null;
        vm.logar = logar;

        function logar() {
            LoginService.login(vm.usuario).success(function () {
                $location.path("/home");
                //debugger
                $window.localStorage.autenticado = true;
            }).error(function (erro) {
                $window.localStorage.autenticado = false;
                //alert(JSON.stringify(erro));
                //alert("Usuário ou senha errado.");
                //alert(JSON.stringify(erro.message));
                alert(erro.message);
            });
        }



    }
})();


/*
function login() {
    LoginService.login(vm.usuario).success(function () {
        $location.path("/home");
        //alert("Paciente cadastrado com sucesso!!");
    }).error(function (erro) {
        alert(JSON.stringify(erro));
    });
}
*/