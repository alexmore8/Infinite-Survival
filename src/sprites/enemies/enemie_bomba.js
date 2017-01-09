define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_bomba(game, x ) {

        this.game = game;
        Enemie.call( this, game, x, this.game.world.height-340, 'bomba');
        this.scale.setTo(0.6);
        this.body.setCircle(23,22,45);


    };

    Enemie_bomba.prototype = Object.create(Enemie.prototype);
    Enemie_bomba.prototype.constructor = Enemie_bomba;




    return Enemie_bomba;
});
