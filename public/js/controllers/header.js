angular.module('CliniMaisApp')
    .controller('HeaderCtrl', function($scope, $location, $window, $auth, $rootScope) {
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    });