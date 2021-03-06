angular.module('JLRAssessment', [
  'ngRoute',
  'mobile-angular-ui',
  'ngDialog',
  'JLRAssessment.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  $routeProvider.when('/onlineassessment', {templateUrl:'onlineassessment.html',  reloadOnSearch: false});
  $routeProvider.when('/manualassessment', {templateUrl:'manualassessment.html',  reloadOnSearch: false});
  $routeProvider.when('/interview', {templateUrl:'interview.html',  reloadOnSearch: false});
  $routeProvider.when('/test/:testid/:pageid', {templateUrl: 'test.html',controller: 'TestController'});
  $routeProvider.when('/test2/:testid/:pageid', {templateUrl: 'test2.html',controller: 'TestController'});
});