angular
    .module("CliniMaisApp", ["ngRoute", "satellizer"])
    .config(function($routeProvider, $locationProvider, $authProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
        .when("/", {
            templateUrl: "partials/login.html",
            controller:"LoginController"
        })
        .when("/login", {
            templateUrl: "partials/login.html",
            controller:"LoginController"
        })
            .when("/home", {
                templateUrl: "partials/home.html",
            })
            .when("/paciente", {
                templateUrl: "partials/paciente.html",
            })
            .when("/paciente/:id", {
                templateUrl: "partials/paciente-form.html",
            })
            .when("/paciente/new", {
                templateUrl: "partials/paciente-form.html",
            })

            .when("/profissional", {
                templateUrl: "partials/profissional.html",
            })
            .when("/profissional/:id", {
                templateUrl: "partials/profissional-form.html",
            })
            .when("/profissional/new", {
                templateUrl: "partials/profissional-form.html",
            })

            .when("/procedimento", {
                templateUrl: "partials/procedimento.html",
            })
            .when("/procedimento/:id", {
                templateUrl: "partials/procedimento-form.html",
            })
            .when("/procedimento/new", {
                templateUrl: "partials/procedimento-form.html",
            })            

            .when("/agendamento", {
                templateUrl: "partials/agendamentos.html"
            })

            .otherwise({
                templateUrl: "partials/404.html",
            });
            /*
            .when("/estado", {
                templateUrl: "partials/estado.html",
            })
            .when("/estado/:id", {
                templateUrl: "partials/estado-form.html",
            })
            .when("/estado/new", {
                templateUrl: "partials/estado-form.html",
            })
            */
    })
    .run(function($rootScope, $window) {
        
    })
    .directive("ngConfirmClick", [
        function() {
            return {
                link: function(scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind("click", function(event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction);
                        }
                    });
                },
            };
        },
    ]);