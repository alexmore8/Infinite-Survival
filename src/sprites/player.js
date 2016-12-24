define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');

    function Player(game, x, y) {
		    Phaser.Sprite.call(this, game, x, y, 'boy_run');
        this.life = 0;
    };

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {

    }

    return Player;
});
