'use strict';

angular.module('gymApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ui.select',
  'angular-momentjs',
  'ngDialog',
  'ngTable',
  'gym.version',
  'gym.database',
  'gym.utilities',
  'angular-confirm',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'angular.filter',
  'ds.clock'
])

/*
.config(function($locationProvider) { // OAuth html5 mode seems to break our routing
  $locationProvider.html5Mode(true).hashPrefix('#');
})
*/
.config([
  '$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }])
.config([
      '$routeProvider', function($routeProvider) {
	$routeProvider.when('/registrer/', {
	  templateUrl: 'templates/gym/checkout.html',
	  controller: 'teamCtrl'
	});
	$routeProvider.when('/admin/', {
	  templateUrl: 'templates/gym/admin.html',
	  controller: 'teamCtrl'
	});
	$routeProvider.when('/om/', {
	  templateUrl: 'templates/gym/om.html',
	  controller: 'teamCtrl'
	});
	$routeProvider.when('/', {redirectTo: '/registrer'});
        
	$routeProvider.otherwise(
          {redirectTo: '/registrer'}
        );
      }])
    .config(['uiSelectConfig', function(uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap';
    }])
;

