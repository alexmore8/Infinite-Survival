define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_nitro(game, x, y ) {

        this.game = game;
        Enemie.call( this, game, x, y, 'nitro');
        this.scale.setTo(0.1);
        this.body.setSize(100, 180, 35, 25);


    };

    Enemie_nitro.prototype = Object.create(Enemie.prototype);
    Enemie_nitro.prototype.constructor = Enemie_nitro;




    return Enemie_nitro;
});
