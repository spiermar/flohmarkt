'use strict';

/* App Module */

var flohmarktApp = angular.module('flohmarktApp', [
  'ngRoute',
  'flohmarktControllers'
]);

flohmarktApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/items', {
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl'
    }).
    otherwise({
      redirectTo: '/items'
    });
}]);