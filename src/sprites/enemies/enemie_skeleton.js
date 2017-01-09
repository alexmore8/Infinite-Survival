define(function (require) {

    'use strict';




    var Enemie = require('enemie');
    var Phaser = require('phaser');

    function Enemie_skeleton(game, x, y ) {

        this.game = game;
        Enemie.call( this, game, x, y, 'skeleton');
        this.scale.setTo(1);
        this.y = game.world.height-(this.height+game.TILESIZE)+5;
        this.body.setSize(this.width,this.height-5,0,0);



    };

    Enemie_skeleton.prototype = Object.create(Enemie.prototype);
    Enemie_skeleton.prototype.constructor = Enemie_skeleton;




    return Enemie_skeleton;
});
