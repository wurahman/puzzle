'use strict';

/**
 * @ngdoc overview
 * @name PuzzleApp
 * @description
 * # workspaceApp
 *
 * Main module of the application.
 */
angular
  .module('puzzleApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'puzzle',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/puzzle/puzzle.html',
        controller: 'PuzzleController'
      })
      .otherwise({
        redirectTo: '/'
      });
    // Set prefix for local storage
    localStorageServiceProvider.setPrefix('puzzle');
  });
