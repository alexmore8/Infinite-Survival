define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Bloque = require('bloque');
    var Phaser = require('phaser');


    function Muro(game, name) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);
        _.extend(this, mainConstants);


         this.enableBody = true;
         this.game = game;
         this.lastCliff = -8;

         this.add(new Bloque(this.game, 0, this.game.world.height - this.TILESIZE, 'floor'));
         for (var i = 1; i < game.NUMTILES; i++) {
             this.nuevoBloque();
         }

    };

    Muro.prototype = Object.create(Phaser.Group.prototype);
    Muro.prototype.constructor = Muro;

    Muro.prototype.parar = function () {     this.callAll('parar');    };
    Muro.prototype.reanudar = function () {  this.callAll('reanudar'); };

    Muro.prototype.update = function () {
        var i, salto = 0;
        if (this.getAt(0).body.x <= -this.TILESIZE) {
            this.getAt(0).destroy();
            this.nuevoBloque();
        }
    };

    Muro.prototype.nuevoBloque = function () {
        var salto = 0;
        if ((Math.random() < this.PROBCLIFF) && (this.lastCliff>3)) {
            salto = 1;
            this.lastCliff = 0;
        }
        else
            this.lastCliff++;

        var x = this.getAt(this.length-1).body.x + this.TILESIZE + salto * this.TILESIZE * 2.5;
        this.add(new Bloque(this.game, x, this.game.world.height - this.TILESIZE, 'floor'));
        if (salto == 1) {
            this.getAt(this.length - 1).loadTexture('floorl');
            this.getAt(this.length - 1).corner = "left";
            this.getAt(this.length - 2).loadTexture('floorr');
            this.getAt(this.length - 2).corner = "right";
        } else {
            this.getAt(this.length - 1).loadTexture('floor');
            this.getAt(this.length - 1).corner = "middle";
        }
    };

    Muro.prototype.isOn = function (enemy) {
        var prevdistance = 10000;
        for (var i=0 ; i< this.NUMTILES ; i++){
            var distance = this.game.physics.arcade.distanceToXY(this.getAt(i), enemy.x, this.getAt(i).y);

            if (distance > prevdistance){
                if ((i == 0) || (this.getAt(i).corner != "middle") || (this.getAt(i-1).corner != "middle")){
                    return false;
                }
                else {
                    return true;
                }
            }
            prevdistance = distance;
        }
        return false;
    };

    Muro.prototype.nextCenter = function (delay) {
        if (delay == undefined) delay = 0;
        for (var i=1 ; i< this.NUMTILES ; i++) {
            //console.log(this.getAt(i).x);
            if ((this.getAt(i).corner == "middle") && (this.getAt(i - 1).corner == "middle") && (delay < this.getAt(i).x))
                return this.getAt(i).x;
        }
        return -1;
    };

    Muro.prototype.debug = function () {
        for (var i=0 ; i< this.NUMTILES ; i++){
            this.game.debug.body(this.getAt(i));
        }
    };

    return Muro;
});
