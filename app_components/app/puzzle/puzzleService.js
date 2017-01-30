'use strict';

angular.module('puzzle.model', ['underscore', 'LocalStorageModule'])
  .factory('puzzle', function(_, localStorageService) {
    var TILES = 'puzzle.tiles';
    var MOVES = 'puzzle.moves';

    var puzzle = {
      moves: 0,
      completed: false,
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      // This is not called automatically, and should be called by controller if state is not saved in localstorage
      shuffle: function() {
        this.tiles = _.shuffle(this.tiles);
        this.moves = 0;
        this.completed = false;
        this.saveState();
      },
      switchTiles: function(i, j) {
        var firstTile = this.tiles[i];
        this.tiles[i] = this.tiles[j];
        this.tiles[j] = firstTile;
        this.moves++;
        if (checkCompletion() === true) {
          this.completed = true;
        };
        this.saveState();
      },
      getTiles: function() {
        return this.tiles;
      },
      saveState: function() {
        localStorageService.set(TILES, JSON.stringify(this.tiles));
        localStorageService.set(MOVES, JSON.stringify(this.moves));
      },
      // This method retrieves the puzzle state from localstorage, and returns true if state is found, returns false otherwise
      loadState: function() {
        if (localStorageService.isSupported) {
          if (_.contains(localStorageService.keys(), TILES) && _.contains(localStorageService.keys(), MOVES)) {
            this.tiles = JSON.parse(localStorageService.get(TILES));
            this.moves = JSON.parse(localStorageService.get(MOVES));
            return true;
          } else {
            return false
          }
        }
      },
      clearState: function() {
        if (localStorageService.isSupported) {
          return localStorageService.clearAll();
        }
      },
      debugState: function() {
        console.log(JSON.parse(localStorageService.get(TILES)));
        console.log(JSON.parse(localStorageService.get(MOVES)));
      }
    };
    var checkCompletion = function() {
      return _.isEqual(_.sortBy(puzzle.tiles), puzzle.tiles);
    }
    return puzzle;
  });
