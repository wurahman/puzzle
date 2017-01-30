'use strict';

angular.module('puzzle')
  .controller('PuzzleController', function($scope, puzzle) {
    var init = function() {
      $scope.selected = -1;
      $scope.puzzle = puzzle;
      if (!puzzle.loadState()) {
        puzzle.shuffle();
      }
    }

    $scope.shuffle = function() {
      puzzle.shuffle();
    }

    $scope.clearState = function() {
      puzzle.clearState();
    }

    $scope.selectTile = function(i) {
      if ($scope.selected != -1 && i !== $scope.selected) {
        $scope.switchTiles(i, $scope.selected);
        $scope.selected = -1;
      } else {
        $scope.selected = ($scope.selected === i) ? '-1' : i;
      }
    }

    $scope.switchTiles = function(i, j) {
      puzzle.switchTiles(i, j);
    }

    init();
  });
