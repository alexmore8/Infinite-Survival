
define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_stone(game, x ) {

        this.game = game;
        Enemie.call( this, game, x,0, 'stone');
        this.scale.setTo(1.2);
        this.y = game.world.height-(this.height+game.TILESIZE);


    };

    Enemie_stone.prototype = Object.create(Enemie.prototype);
    Enemie_stone.prototype.constructor = Enemie_stone;




    return Enemie_stone;
});
