'use strict';

angular.module('puzzle')
  .controller('PuzzleController', function($scope, puzzle) {
    var init = function() {
      $scope.selected = -1;
      $scope.puzzle = puzzle;
    }

    $scope.shuffle = function() {
      puzzle.shuffle();
    }

    $scope.selectTile = function(i) {
      if ($scope.selected != -1) {
        $scope.switchTiles(i, $scope.selected);
      } else {
        $scope.selected = ($scope.selected === i) ? '-1' : i;
      }
    }

    $scope.switchTiles = function(i, j) {
      puzzle.switchTiles(i, j);
      $scope.selected = -1;
    }

    init();
  });
