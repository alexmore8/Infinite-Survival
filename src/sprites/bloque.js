define(function (require) {

    'use strict';
    var Phaser = require('phaser');



    function Bloque(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'floor');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.immovable = true;
        this.corner = "middle";
        this.body.velocity.x = -game.LEVELSPEED;
    };

    Bloque.prototype = Object.create(Phaser.Sprite.prototype);
    Bloque.prototype.constructor = Bloque;

    Bloque.prototype.parar = function () {
        this._velocidad = this.body.velocity;
        this.body.velocity = 0;
    };

    Bloque.prototype.reanudar = function () {
        this.body.velocity  = this._velocidad;
        this._velocidad = null;
    };

    return Bloque;
});
