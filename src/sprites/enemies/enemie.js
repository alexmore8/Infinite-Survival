define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');

    function Enemie(game, x, y, sprite) {
        _.extend(this, mainConstants);


        this.game = game;

		Phaser.Sprite.call(this, game, x, y, sprite);
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

       // this.body.velocity.x = -game.LEVELSPEED;
        this.checkWorldBounds = true;


    };

    Enemie.prototype = Object.create(Phaser.Sprite.prototype);
    Enemie.prototype.constructor = Enemie;

    Enemie.prototype.parar = function () {
        this._velocidad = this.body.velocity;
        this.body.velocity = 0;
    };

    Enemie.prototype.reanudar = function () {
        this.body.velocity = this._velocidad;
        this._velocidad = null;
    };


    return Enemie;
});
