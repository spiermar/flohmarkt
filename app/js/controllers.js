'use strict';

/* Controllers */

var flohmarktControllers = angular.module('flohmarktControllers', []);

flohmarktControllers.controller('ItemListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/REST/items').success(function(data) {
  	$scope.items = data;
  });
}]);
