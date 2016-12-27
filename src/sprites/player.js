define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');

    function Player(game, x, y) {

        this.life = 0;
        this.jumping = false;


		Phaser.Sprite.call(this, game, x, y, 'boy_run');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);


        this.scale.setTo(1);
        this.body.gravity.y = 2500;
        this.body.velocity.y = - game.LEVELSPEED;
    };

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.walk = function () {
        this.loadTexture('boy_run');
        this.animations.play('walk', 10, true);
        this.jumping = false;
    };

    Player.prototype.jump = function () {
        this.loadTexture('boy_jump');
        this.animations.add('jump');
        this.animations.play('jump', 10, true);
        this.jumping = true;
    };

    Player.prototype.slide = function () {
        this.loadTexture('boy_slide');
        this.animations.add('slide');
        this.animations.play('slide', 10, true);
        this.jumping = true;
    };

    return Player;
});
