'use strict';


// Declare app level module which depends on filters, and services
angular.module('flohmarktApp', [
  'ngRoute',
  'flohmarktFilters',
  'flohmarktServices',
  'flohmarktDirectives',
  'flohmarktControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'flohmarktCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'flohmarktCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
