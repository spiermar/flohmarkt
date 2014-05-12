'use strict';

/* Controllers */

var flohmarktApp = angular.module('flohmarktApp', []);

flohmarktApp.controller('ItemListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/REST/items').success(function(data) {
  	$scope.items = data;
  });
}]);
