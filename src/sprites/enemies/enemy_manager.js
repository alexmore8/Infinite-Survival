define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');
    var Enemy = [];
    Enemy[0] = require('sprites/enemies/enemy_bomba');
    Enemy[1] = require('sprites/enemies/enemy_calavera');
    Enemy[2] = require('sprites/enemies/enemy_nitro');
    Enemy[3] = require('sprites/enemies/enemy_pinchos');
    Enemy[4] = require('sprites/enemies/enemy_skeleton');
    Enemy[5] = require('sprites/enemies/enemy_stone');
    Enemy[6] = require('sprites/enemies/enemy_tnt');


    function Enemy_manager(game, level, name) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);
        _.extend(this, mainConstants);

         this.enableBody = true;
         this.game = game;
         this.level = level;

        this.nuevoEnemigo(1000);
        this.nuevoEnemigo(1500);
        this.nuevoEnemigo(2000);
    };

    Enemy_manager.prototype = Object.create(Phaser.Group.prototype);
    Enemy_manager.prototype.constructor = Enemy_manager;

    Enemy_manager.prototype.parar = function () {     this.callAll('parar');    };
    Enemy_manager.prototype.reanudar = function () {  this.callAll('reanudar'); };

    Enemy_manager.prototype.update = function () {
        for (var i = 0; i< this.length; i++){
            if (this.getAt(i).x + this.getAt(i).width < 0){
                this.getAt(i).destroy();
                this.nuevoEnemigo();
                i--;
            }
        }
    };

    Enemy_manager.prototype.nuevoEnemigo = function () {
        var randomEnemy = Math.floor(Math.random() * 7);
        var height = Math.random() < 0.5 ? "floor" : "air";
        var randomDistance = this.length == 0 ? 1000 : this.getAt(this.length-1).x + 500 + Math.floor(Math.random() * 400);
        randomDistance = randomDistance < this.game.world.width ? this.game.world.width : randomDistance;

        do {
            randomDistance +=100;
            randomDistance = this.level.suelo.nextCenter(randomDistance);
            if (randomDistance == -1) return;
            var enemy = new Enemy[randomEnemy](this.game, randomDistance, height);
            enemy.x -= enemy.width/2;
        } while (this.game.physics.arcade.distanceToXY(this.level.coin,enemy.x,this.level.coin.y) < 100);
        this.add(enemy);
        console.log(this.length);
        /*enemy = undefined;
        do {
            if (enemy != undefined) enemy.destroy();
            var enemy = new Enemy[randomEnemy](this.game, randomDistance, height);
            var distance = this.game.physics.arcade.distanceBetween(enemy,this.level.coin);
            var onFloor = this.level.suelo.isOn(enemy);
        } while (distance < 100 || onFloor == false);
        this.add(enemy);
        enemy = undefined;
        do {
            if (enemy != undefined) enemy.destroy();
            var enemy = new Enemy[randomEnemy](this.game, randomDistance, height);
            var distance = this.game.physics.arcade.distanceBetween(enemy,this.level.coin);
            var onFloor = this.level.suelo.isOn(enemy);
        } while (distance < 100 || onFloor == false);
        this.add(enemy);
        enemy = undefined;

        this.getAt(0).destroy();
        console.log(this.getAt(0));
        console.log(this.getAt(1));
        console.log();

        /*var i = 0;
        this.add(new Enemy[i](this.game, 100, "floor"));
        return this.add(new Enemy[i](this.game, 500, "air"));*/
    };

    Enemy_manager.prototype.debug = function () {
        for (var i=0 ; i< this.lenght ; i++){
            this.game.debug.body(this.getAt(i));
        }
    };

    return Enemy_manager;
});
