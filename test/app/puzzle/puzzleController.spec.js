describe("PuzzleController", function() {

  beforeEach(module('puzzle'));

  var $scope, $rootScope, controller, puzzle;

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    puzzle = {
      shuffle: function() {},
      clearState: function() {},
      selectTile: function() {},
      switchTiles: function() {},
    };

    spyOn(puzzle, 'shuffle');
    spyOn(puzzle, 'loadState').andReturn(false);
    spyOn(puzzle, 'selectTile');
    spyOn(puzzle, 'switchTiles');

    $scope = $rootScope.$new();
    $controller('PuzzleController', {
      $scope: $scope,
      puzzle: puzzle
    });

  }));

  xit("should call shuffle when state is not loaded", function() {
    expect($scope.puzzle.shuffle).toHaveBeenCalled();
  });
});
