define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Bloque = require('sprites/bloque');
    var Phaser = require('phaser');


    function Muro(game, name) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);
        _.extend(this, mainConstants);


         this.enableBody = true;

         for (var i = 0; i < game.NUMTILES; i++) {
             this.add(new Bloque(game, i * this.TILESIZE, game.world.height - this.TILESIZE, 'floor'));
         }
         this.lastFloor = this.getAt(this.NUMTILES - 1);
         this.lastCliff = false;

    };

    Muro.prototype = Object.create(Phaser.Group.prototype);
    Muro.prototype.constructor = Muro;

    Muro.prototype.update = function () {
        var i, salto = 0;
        for (i = 0; i < this.NUMTILES; i++) {
            if (this.getAt(i).body.x <= -this.TILESIZE) {

                if ((Math.random() < this.PROBCLIFF) && !this.lastCliff) {
                    salto = 1;
                    this.lastCliff = true;
                }
                else
                    this.lastCliff = false;

                this.getAt(i).body.x = this.lastFloor.body.x + this.TILESIZE + salto * this.TILESIZE * 2.5;
                if (salto == 1) {
                    this.getAt(i).loadTexture('floorl');
                    var j = i == 0 ? this.NUMTILES - 1 : i - 1;
                    this.getAt(j).loadTexture('floorr');
                } else {
                    this.getAt(i).loadTexture('floor');
                }
                this.lastFloor = this.getAt(i);
                break;
            }
        }
    };

    return Muro;
});
