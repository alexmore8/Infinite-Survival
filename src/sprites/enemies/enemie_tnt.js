
define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_tnt(game, x ) {

        this.game = game;
        Enemie.call( this, game, x, this.game.world.height-360, 'tnt');
        this.scale.setTo(0.3);


    };

    Enemie_tnt.prototype = Object.create(Enemie.prototype);
    Enemie_tnt.prototype.constructor = Enemie_tnt;




    return Enemie_tnt;
});
