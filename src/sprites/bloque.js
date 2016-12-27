define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');



    function Bloque(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'floor');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.immovable = true;
        this.body.velocity.x = game.LEVELSPEED;
    };

    Bloque.prototype = Object.create(Phaser.Sprite.prototype);
    Bloque.prototype.constructor = Bloque;



    return Bloque;
});
