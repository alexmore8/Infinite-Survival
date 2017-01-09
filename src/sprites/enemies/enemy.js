define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');
    var Explosion = require('sprites/enemies/explosion');

    function Enemy(game, x, y, sprite) {
        _.extend(this, mainConstants);
        this.game = game;

		Phaser.Sprite.call(this, game, x, y, sprite);
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.velocity.x = - this.LEVELSPEED;
        this.body.immovable = true;
        this.checkWorldBounds = true;
        this.golpe = 10;
    };

    Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy.prototype.constructor = Enemy;

    Enemy.prototype.parar = function () {
        this._velocidad = this.body.velocity;
        this.body.velocity = 0;
    };

    Enemy.prototype.reanudar = function () {
        this.body.velocity = this._velocidad;
        this._velocidad = null;
    };

    Enemy.prototype.explode = function () {
        new Explosion(this.game, this.x + (this.width/2), this.y + this.height);
        this.destroy();
    };

    Enemy.prototype.debug = function () { this.game.debug.body(this); };

    return Enemy;
});
