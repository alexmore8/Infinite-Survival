define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_calavera(game, x ) {

        this.game = game;
        Enemie.call( this, game, x, 0, 'calavera');
        this.body.setSize(this.width, this.height-80, 0, 0);
        this.scale.setTo(0.2);
        this.y = game.world.height-(this.height+game.TILESIZE)+12;

    };

    Enemie_calavera.prototype = Object.create(Enemie.prototype);
    Enemie_calavera.prototype.constructor = Enemie_calavera;




    return Enemie_calavera;
});
