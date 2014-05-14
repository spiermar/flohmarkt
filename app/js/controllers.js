/*jslint node: true*/
/*global angular*/

'use strict';

/* Controllers */

var flohmarktControllers = angular.module('flohmarktControllers', []);

flohmarktControllers.controller('ItemListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({method: 'GET', url: '/REST/items'}).
        success(function (data) {
            $scope.items = data;
        });
}]);
