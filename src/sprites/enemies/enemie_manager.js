define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Bloque = require('bloque');
    var Phaser = require('phaser');
    var Enemies = [];
    var Enemies[0] = require('enemie_bomba');
    var Enemies[1] = require('enemie_calavera');
    var Enemies[2] = require('enemie_nitro');
    var Enemies[3] = require('enemie_pinchos');
    var Enemies[4] = require('enemie_skeleton');
    var Enemies[5] = require('enemie_stone');
    var Enemies[6] = require('enemie_tnt');


    function Enemie_manager(game, name) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);
        _.extend(this, mainConstants);


         this.enableBody = true;
         this.game = game;



    };

    Enemie_manager.prototype = Object.create(Phaser.Group.prototype);
    Enemie_manager.prototype.constructor = Enemie_manager;

    Enemie_manager.prototype.parar = function () {
        for (var i = 0; i < this.NUMTILES; i++) {
            this.getAt(i).parar();
        }
    };

    Enemie_manager.prototype.reanudar = function () {
        for (var i = 0; i < this.NUMTILES; i++) {
            this.getAt(i).reanudar();
        }
    };

    Enemie_manager.prototype.nuevoEnemigo = function () {

    };
    
    Enemie_manager.prototype.debug = function () {
        for (var i=0 ; i< this.NUMTILES ; i++){
            this.game.debug.body(this.getAt(i));
        }
    };

    return Enemie_manager;
});
