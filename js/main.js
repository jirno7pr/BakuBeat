// Generated by CoffeeScript 1.8.0
(function() {
  var GameSys, Note;

  this.Game = (function() {
    var _endGameIfTimeOver, _endTime, _fallDist, _game, _n, _noteHeight, _noteWidth, _pool, _score, _status, _threshold;

    _fallDist = 550;

    _noteWidth = 64;

    _noteHeight = 64;

    _endTime = 90;

    _threshold = {
      great: 0.1,
      good: 0.2
    };

    _game = null;

    _status = "stop";

    _pool = {
      note: []
    };

    _score = {
      board: null,
      actual: 0,
      shown: 0
    };

    _n = null;

    function Game(parms) {
      enchant();
      _game = new Core(980, 600);
      _game.fps = 60;
      _game.preload("img/chara1.png", "img/chara1_shadow.png", "img/logo.png", "img/score.png");
    }

    Game.prototype.play = function(music) {
      _game.preload(music.src, music.img);
      _endTime = music.endTime;
      _n = new Note(_game, music.note);
      _game.start();
      return _game.onload = function() {
        _game.music = _game.assets[music.src];
        _score.board = new Score({
          game: _game,
          offsetX: 20,
          offsetY: 360,
          url: "img/score.png",
          num: 6,
          width: 36,
          height: 49.7
        });
        _n.init();
        _score.board.generate();
        _score.board.update(0);
        return _game.rootScene.addEventListener("enterframe", function() {
          if (_status === "playing") {
            _n.create();
          }
          if (_score.actual > _score.shown) {
            _score.shown += 100000 / _note.timing.length / 6;
            if (_score.actual < _score.shown) {
              _score.shown = _score.actual;
            }
            _score.board.update(Math.ceil(_score.shown));
          }
          return _endGameIfTimeOver();
        });
      };
    };

    _endGameIfTimeOver = function() {
      var music;
      music = _game.music;
      if (music.currentTime >= _endTime || music.duration <= music.currentTime) {
        if (music.volume - 0.1 < 0) {
          music.volume = 0;
        } else {
          music.volume -= 0.1;
        }
        if (music.volume <= 0) {
          music.stop();
          music.volume = 1;
          music.currentTime = 0;
          return _status = "stop";
        }
      }
    };

    document.addEventListener("keydown", function(e) {
      var code, music, value, _i, _len, _ref, _ref1;
      music = _game.music;
      if (_status === "stop") {
        if (e.keyCode === 13) {
          music.play();
          return _status = "playing";
        }
      } else if (_status = "playing") {
        _ref = _note.group.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          switch (e.keyCode) {
            case 90:
              code = 0;
              break;
            case 83:
              code = 1;
              break;
            case 88:
              code = 2;
              break;
            case 68:
              code = 3;
              break;
            case 67:
              code = 4;
              break;
            default:
              code = null;
          }
          if (value.key === code) {
            if ((-1 < (_ref1 = value.timing - music.currentTime) && _ref1 < 1)) {
              value.clear = true;
              value.clearTime = music.currentTime;
              break;
            }
          }
        }
      }
    });

    return Game;

  })();

  Note = (function() {
    var _fallDist, _game, _gen, _note, _noteHeight, _noteWidth, _pool, _preAllocate, _renderDist;

    _game = null;

    _pool = [];

    _fallDist = 550;

    _noteWidth = 64;

    _noteHeight = 64;

    _note = {
      index: 0,
      group: null,
      timing: [],
      key: [],
      speed: 0
    };

    function Note(game, params) {
      _game = game;
      _note.timing = params.timing;
      console.log(_note.timing);
      _note.key = params.key;
      _note.speed = params.speed;
    }

    Note.prototype.init = function() {
      _note.group = new Group();
      _note.index = 0;
      _renderDist();
      _preAllocate();
      return _game.rootScene.addChild(_note.group);
    };

    Note.prototype.create = function() {
      if (_note.timing[_note.index] != null) {
        if (_game.music.currentTime > (_note.timing[_note.index] - (_fallDist / _note.speed))) {
          return _gen(_note.index++);
        }
      }
    };

    _renderDist = function() {
      var i, noteShadow, _i;
      for (i = _i = 0; _i < 5; i = ++_i) {
        noteShadow = new Sprite(_noteWidth, _noteHeight);
        noteShadow.y = -_noteHeight + _fallDist;
        noteShadow.opacity = 0.6;
        noteShadow.x = i * (_noteWidth + 20) + 480;
        noteShadow.image = _game.assets["img/chara1_shadow.png"];
        _game.rootScene.addChild(noteShadow);
      }
    };

    _preAllocate = function() {
      var note, v, _i, _len, _ref;
      _ref = _note.timing;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        note = new Sprite(_noteWidth, _noteHeight);
        note.image = _game.assets["img/chara1.png"];
        GameSys.poolSprite(_pool, note);
      }
    };

    _gen = function(number) {
      var note;
      note = GameSys.getSprite(_pool);
      note.number = number;
      note.key = _note.key[number];
      note.destinationY = -_noteHeight + _fallDist;
      note.y = -_noteHeight;
      note.x = note.key * (note.width + 20) + 480;
      note.frame = 0;
      note.timing = _note.timing[number];
      note.clear = false;
      note.opacity = 1;
      note.tl.clear();
      note.tl.setTimeBased();
      note.tl.scaleTo(1, 1, 0);
      note.tl.moveY(note.destinationY, (_fallDist / _note.speed) * 1000);
      note.hasClearAnimationStarted = false;
      _note.group.addChild(note);
      return note.addEventListener("enterframe", function() {
        var judge, judgeLabel, music, _ref, _ref1;
        music = _game.music;
        note = _note;
        if (this.oldtime != null) {
          this.rotate((music.currentTime - this.oldtime) * 500);
        }
        this.oldtime = music.currentTime;
        if (note.timing[this.number] - music.currentTime < -1) {
          this.tl.fadeOut(300).then(function() {
            return note.group.removeChild(this);
          });
        }
        if (this.clear && !this.hasClearAnimationStarted) {
          this.tl.clear();
          this.tl.scaleTo(1.5, 1.5, 200).and().fadeOut(200).then(function() {
            return note.group.removeChild(this);
          });
          if ((-_threshold.great < (_ref = note.timing[this.number] - this.clearTime) && _ref < _threshold.great)) {
            judge = "great";
            _game.score.actual += 100000 / _note.timing.length;
          } else if ((-_threshold.good < (_ref1 = note.timing[this.number] - this.clearTime) && _ref1 < _threshold.good)) {
            judge = "good";
            _game.score.actual += 70000 / _note.timing.length;
          } else {
            judge = "bad";
          }
          judgeLabel = new Label(judge);
          judgeLabel.x = 450;
          judgeLabel.y = 450;
          _game.rootScene.addChild(judgeLabel);
          judgeLabel.tl.setTimeBased();
          judgeLabel.tl.fadeOut(300).and().moveY(400, 300).then(function() {
            return _game.rootScene.removeChild(judgeLabel);
          });
          return this.hasClearAnimationStarted = true;
        }
      });
    };

    return Note;

  })();

  GameSys = (function() {
    function GameSys() {}

    GameSys.getSprite = function(pool) {
      var i, value, _i, _len;
      for (i = _i = 0, _len = pool.length; _i < _len; i = ++_i) {
        value = pool[i];
        if (!value.active) {
          value.active = true;
          return value;
        }
      }
      console.log("error sprite pool empty");
      return false;
    };

    GameSys.poolSprite = function(pool, sprite) {
      pool.push(sprite);
      sprite.active = false;
      if (sprite.addEventListener) {
        return sprite.addEventListener("removed", function() {
          return this.active = false;
        });
      }
    };

    return GameSys;

  })();

}).call(this);
