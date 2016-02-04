'use strict';

/**
 * @ngdoc overview
 * @name clothingWebsiteApp
 * @description
 * # clothingWebsiteApp
 *
 * Main module of the application.
 */
angular
  .module('clothingWebsiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
