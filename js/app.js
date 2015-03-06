// Generated by CoffeeScript 1.8.0
(function() {
  var flavaApp, _endCallback, _game, _gameId, _loadCallback;

  _game = null;

  _gameId = 0;

  _loadCallback = function() {
    return console.log("load");
  };

  _endCallback = function() {
    return console.log("end");
  };

  flavaApp = angular.module('flavaApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

  flavaApp.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'splash.html'
    }).when('/select', {
      templateUrl: 'select.html'
    }).when('/ouroboros/:id', {
      controller: 'gameCtrl',
      templateUrl: 'ouroboros.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

  flavaApp.controller('splashCtrl', function($scope) {
    var agent;
    agent = navigator.userAgent;
    if (agent.search(/(iPhone|iPod|Android|Mobile)/) !== -1) {
      return $scope.isMobile = true;
    } else {
      return $scope.isMobile = false;
    }
  });

  flavaApp.controller('gameCtrl', function($scope, $routeParams) {
    _gameId = $routeParams.id;
    _game = new Game(_loadCallback, _endCallback);
    return _game.play(g_music[$routeParams.id]);
  });

  flavaApp.controller('SelectCtrl', function($scope) {
    var i, level, value, _i, _j, _len, _ref;
    $scope.desc = false;
    $scope.music = g_music;
    _ref = $scope.music;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      value = _ref[_i];
      level = 'Level ';
      for (i = _j = 0; _j <= 9; i = ++_j) {
        if (i < value.level) {
          level += '<i class="fa fa-star-o level"></i>';
        }
      }
      value.levelIcon = level;
    }
    return $scope.changeSort = function() {
      return $scope.desc = !$scope.desc;
    };
  });

  flavaApp.controller('GameInfoCtrl', function($scope) {
    var i, level, _i;
    $scope.music = g_music[_gameId];
    level = 'Level ';
    for (i = _i = 0; _i <= 9; i = ++_i) {
      if (i < $scope.music.level) {
        level += '<i class="fa fa-star-o level"></i>';
      }
    }
    return $scope.music.levelIcon = level;
  });

}).call(this);
