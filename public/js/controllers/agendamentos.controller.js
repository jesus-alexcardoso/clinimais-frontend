(function() {
    "use strict";
 
    angular
        .module("CliniMaisApp")
        .controller("AgendamentoController", AgendamentoController);
 
    AgendamentoController.$inject = [
        "AgendamentoService",
        "$location",
        "$routeParams",
        "$scope",
        "$rootScope",
    ];
 
    function AgendamentoController(
        AgendamentoService,
        $location,
        $routeParams,
        $scope,
        $rootScope
    ) {
        var vm = this;
 
        vm.abrirNovoAgendamento = abrirNovoAgendamento;
        vm.salvar = salvar;
        vm.excluirAgendamento = excluirAgendamento;
        vm.agendamento = {};
 
        activate();
 
        $rootScope.$on('onTrocaEmpresa', function(mass) {
            atualizaCalendarTeste();
        });
 
        function activate() {
            var query = vm.busca ? { $text: { $search: vm.busca } } : {};
            AgendamentoService.find(query).then(function(result) {
                $scope.names = result.data;
                atualizaCalendar();
            });
        }
 
        function abrirNovoAgendamento() {
            vm.agendamento = {};
            vm.agendamento.titulo = "Novo agendamento";
            vm.agendamento.start = new Date();
            vm.agendamento.end = new Date();
        }
 
        $scope.abrirNovoAgendamentoCustom = function() {
            vm.agendamento = {};
            vm.agendamento.titulo = "Novo agendamento customizado";
            vm.agendamento.start = new Date();
            vm.agendamento.end = new Date();
            $scope.$apply();
            $('#exampleModal').modal('show');
        }
 
        $scope.abrirNovoAgendamentoCalendarNew = function(start, end) {
            vm.agendamento = {};
            vm.agendamento.titulo = "Novo agendamento";
 
            let data = new Date(start);
            data.setHours(data.getHours() + 3);
            vm.agendamento.start = data;
 
            let dataend = new Date(end);
            dataend.setHours(dataend.getHours() + 3);
            vm.agendamento.end = dataend;
            $scope.$apply();
            $('#exampleModal').modal('show');
        }
 
        $scope.abrirNovoAgendamentoCalendar = function(event) {
            vm.agendamento.id = event.id
            vm.agendamento.titulo = event.title;
 
            let data = new Date(event.start);
            data.setHours(data.getHours() + 3);
            vm.agendamento.start = data;
 
            let dataend = new Date(event.end);
            dataend.setHours(dataend.getHours() + 3);
            vm.agendamento.end = dataend;
 
 
            vm.agendamento.cliente = event.cliente;
            vm.agendamento.servico = event.servico;
            vm.agendamento.profissional = event.profissional;
 
            vm.agendamento.backgroundColor = event.backgroundColor;
 
            $scope.$apply();
            $('#exampleModal').modal('show');
        }
 
        $scope.resizeAgendamentoCalendar = function(event) {
            vm.agendamento.id = event.id
            vm.agendamento.titulo = event.title;
 
            let data = new Date(event.start);
            data.setHours(data.getHours() + 3);
            vm.agendamento.start = data;
 
            let dataend = new Date(event.end);
            dataend.setHours(dataend.getHours() + 3);
            vm.agendamento.end = dataend;
            vm.agendamento.backgroundColor = event.backgroundColor;
            salvar();
        }
 
        $scope.dropAgendamentoCalendar = function(event) {
            vm.agendamento.id = event.id
            vm.agendamento.titulo = event.title;
 
            let data = new Date(event.start);
            data.setHours(data.getHours() + 3);
            vm.agendamento.start = data;
 
            let dataend = new Date(event.end);
            dataend.setHours(dataend.getHours() + 3);
            vm.agendamento.end = dataend;
            vm.agendamento.backgroundColor = event.backgroundColor;
            salvar();
        }
 
 
        async function salvar() {
            vm.agendamento.empresa = $rootScope.currentEmpresa;
            vm.agendamento.title = vm.agendamento.titulo;
 
            let data = new Date(vm.agendamento.start);
            data.setHours(data.getHours() - 3);
            vm.agendamento.start = data;
 
            let dataend = new Date(vm.agendamento.end);
            dataend.setHours(dataend.getHours() - 3);
            vm.agendamento.end = dataend;
 
            await AgendamentoService.save(vm.agendamento).success(function() {
                message("sucesso", "Agendamento salvo com sucesso!");
            });
            await atualizaCalendarTeste();
        }
 
        function excluirAgendamento() {
            AgendamentoService.remove(vm.agendamento.id).success(function() {
                message("sucesso", "Agendamento excluido com sucesso!");
            });
            atualizaCalendarTeste();
        }
 
 
        function atualizaCalendar() {
            $('#calendar').fullCalendar({
                ignoreTimezone: false,
                monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
                dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                buttonText: {
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Dia"
                },
                locale: 'en',
                timezone: "America/Sao_Paulo",
                events: $scope.names,
                header: {
                    left: 'today, prevYear, nextYear, viewWeekends',
                    center: 'prev, title, next',
                    right: 'month, agendaWeek, agendaDay'
                },
                selectable: true,
                editable: true,
                customButtons: { //주말 숨기기 & 보이기 버튼
                    viewWeekends: {
                        text: 'Adicionar Evento',
                        click: function() {
                            $scope.abrirNovoAgendamentoCustom();
                        }
                    }
                },
                eventClick: function(event, jsEvent, view) {
                    $scope.abrirNovoAgendamentoCalendar(event);
                },
                select: function(start, end, eventType) {
                    console.log(start);
                    console.log(end);
                    $scope.abrirNovoAgendamentoCalendarNew(start, end);
                },
                eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                    console.log("eventResize: " + event);
                    $scope.resizeAgendamentoCalendar(event);
                },
                eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
                    console.log("eventDrop: " + event);
                    $scope.dropAgendamentoCalendar(event);
                }
            });
        }
 
        function atualizaCalendarTeste() {
            let backup = $scope.names;
            AgendamentoService.find().then(function(result) {
                $scope.names = result.data;
                $('#calendar').fullCalendar('removeEventSource', backup);
                $('#calendar').fullCalendar('addEventSource', $scope.names);
                $('#calendar').fullCalendar('refetchEvents');
            });
        };
 
        function message(tipo, mensagem) {
            let text = "";
            if (tipo === 'info') {
                tipo = 'alert alert-info';
                text = 'Informação!';
            }
            if (tipo === 'sucesso') {
                tipo = 'alert alert-success';
                text = 'Sucesso!';
            }
            if (tipo === 'erro') {
                tipo = 'alert alert-error';
                text = 'Erro!';
            }
            let message = '<div id="alerta" class="' + tipo + '" id="bsalert">';
            message += '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ';
            message += '    <strong>' + text + '</strong> ' + mensagem + '  ';
            message += ' </div> ';
            $("#divPrincipal").append(message);

            setTimeout(function(){ 
                $("#alerta").alert('close');
             }, 3000);
        }
    }
})();
 

