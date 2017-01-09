define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_pinchos(game, x ) {

        this.game = game;
        Enemie.call( this, game, x, 0, 'pinchos');
        this.scale.setTo(0.8);
        this.y = game.world.height-(this.height+game.TILESIZE);



    };

    Enemie_pinchos.prototype = Object.create(Enemie.prototype);
    Enemie_pinchos.prototype.constructor = Enemie_pinchos;




    return Enemie_pinchos;
});
