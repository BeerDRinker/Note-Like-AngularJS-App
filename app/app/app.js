const myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', function ($routeProvider, ) {

    $routeProvider
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: './views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: './views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: './views/directory.html',
            controller: 'NinjaController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);

myNinjaApp.directive('randomNinja', [function () {
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: './views/random.html',
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function ($scope, $http) {

    $scope.removeNinja = function (ninja) {
        const removeNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removeNinja, 1);
    };

    $scope.addNinja = function (ninja) {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            thumb: '../content/img/ninja.png',
            available: true
        });

        $scope.newninja.name = '';
        $scope.newninja.belt = '';
        $scope.newninja.rate = '';
    };

    $scope.removeAll = function () {
        $scope.ninjas = [];
    };

    $http({
        method: 'GET',
        url: '/ninjasJSON'
    }).then(function (data) {
        $scope.ninjas = data.data;
    }, function (error) {
        console.log(error);
    });

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    $scope.sendMessage = function () {
        $location.path('/contact-success');
        console.log();
       $http.post('/sendMessage', $scope.contact);//.then(successCallback, errorCallback);
    };

}]);