define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');

    function Coin(game, x, y) {
        _.extend(this, mainConstants);
        this.coinsound = game.add.audio("sound_coin");

        var prob = Math.random();
        this.coin = prob < this.PROBGOLD ? "gold" : prob < this.PROBGOLD+this.PROBSILVER ? "silver" : "bronze";
        this.valor = prob < this.PROBGOLD ? this.GOLDVALUE : prob < this.PROBGOLD+this.PROBSILVER ? this.SILVERVALUE : this.BRONZEVALUE;
        this.sprite = "coin_" + this.coin;

        this.game = game;

		Phaser.Sprite.call(this, game, x, y, this.sprite);
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //this.body.immovable = true;
        this.body.velocity.x = -game.LEVELSPEED;
        this.body.setCircle(37);
        this.checkWorldBounds = true;

        this.animations.add('turn');
        this.animations.play('turn', 15, true);
    };

    Coin.prototype = Object.create(Phaser.Sprite.prototype);
    Coin.prototype.constructor = Coin;

    Coin.prototype.parar = function () {
        this._velocidad = this.body.velocity;
        this.body.velocity = 0;
    };

    Coin.prototype.reanudar = function () {
        this.body.velocity = this._velocidad;
        this._velocidad = null;
    };

    Coin.prototype.takeCoin = function () {
        this.coinsound.play("",0,this.game.effectsvolume);
    }



    return Coin;
});
