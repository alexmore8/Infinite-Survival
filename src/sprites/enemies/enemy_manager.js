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
        if (this.getAt(0).x + this.getAt(0).width < 0){
            this.getAt(0).destroy();
            this.nuevoEnemigo();
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
        } while (this.game.physics.arcade.distanceBetween(this.level.coin,enemy) < 100);
        this.add(enemy);

    };

    Enemy_manager.prototype.debug = function () {this.callAll('debug');};

    return Enemy_manager;
});
