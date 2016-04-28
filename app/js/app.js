/*jslint node: true */
/*global angular*/

'use strict';

/* App Module */

var flohmarktApp = angular.module('flohmarktApp', [
    'ngRoute',
    'flohmarktControllers'
]);

flohmarktApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/item', {
            templateUrl: 'partials/item-list.html',
            controller: 'ItemListCtrl'
        }).
        when('/item/:permalink', {
            templateUrl: 'partials/item-details.html',
            controller: 'ItemDetailsCtrl'
        }).
        otherwise({
            redirectTo: '/item'
        });
}]);