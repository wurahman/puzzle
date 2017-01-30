'use strict';

angular.module('puzzle.model', [ 'underscore', 'LocalStorageModule'])
.factory('puzzle', function(_, localStorageService) {
	var TILES = 'puzzle.tiles';
	var MOVES = 'puzzle.moves';

	var puzzle = {
			moves : 0,
			completed : false,
			tiles: [1,2,3,4,5,6,7,8,9],
		shuffle : function() {
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
			if (checkCompletion()===true) {
				this.completed=true;
			};
			this.saveState();
		},
		getTiles : function() {
			return this.tiles;
		},
		saveState: function() {
			localStorageService.set(TILES, JSON.stringify(this.tiles));
			localStorageService.set(MOVES, JSON.stringify(this.moves));
		},
		loadState: function() {
			if(localStorageService.isSupported) {
				if (_.contains(localStorageService.keys(), TILES) && _.contains(localStorageService.keys(), MOVES)) {
					this.tiles = JSON.parse(localStorageService.get(TILES));
					this.moves = JSON.parse(localStorageService.get(MOVES));
					console.log('loaded state from storage');
				} else {
					console.log('Nothing found in storage');
				}
			}
		},
		clearState: function() {
			if(localStorageService.isSupported) {
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