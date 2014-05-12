'use strict';

/* Controllers */

var flohmarktApp = angular.module('flohmarktApp', []);

flohmarktApp.controller('ItemListCtrl', function($scope) {
  $scope.items = [{"price":1,"description":"test description","name":"test","_id":"536ebd787b7e86fc0ccb0d99","__v":0,"likes":[]},{"price":2,"description":"test description 2","name":"test 2","_id":"536f002a77b4ca02004ee0ec","__v":0,"likes":[]}]
});
