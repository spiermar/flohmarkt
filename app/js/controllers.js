/*jslint node: true*/
/*global angular*/

'use strict';

/* Controllers */

var flohmarktControllers = angular.module('flohmarktControllers', []);

flohmarktControllers.controller('ItemListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({method: 'GET', url: '/REST/item'}).
        success(function (data) {
            $scope.items = data;
        });
}]);

flohmarktControllers.controller('ItemDetailsCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http({method: 'GET', url: '/REST/item/' + $routeParams.permalink}).
        success(function (data) {
            $scope.item = data;
        });
}]);
