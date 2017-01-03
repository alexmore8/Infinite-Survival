define(function (require) {

    'use strict';

    var Phaser = require('phaser');

    function Player(game, x, y) {

        this.health = 100;
        this.power = 0;
        this.distancia = 0;
        this.jumping = false;
        this.sliding = false;


        this.updating = true;

		Phaser.Sprite.call(this, game, x, y, 'boy_run');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.camera.follow(this);

        this.checkWorldBounds = true;
        this.body.gravity.y = 2500;
        this.body.velocity.y = game.LEVELSPEED;
        this.walk();
    };

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {
        if (this.updating) {
            this.distancia += 1 / 20
            this.power = this.power > 100 ? 100 : this.power + 1 / 20;
        }
    };

    Player.prototype.parar = function () {
        this._velocidad = this.body.velocity;
        this.body.velocity = 0;
        this._gravedad = this.body.gravity;
        this.body.gravity = 0;
        this.updating = false;
    };

    Player.prototype.reanudar = function () {
        this.body.velocity = this._velocidad;
        this._velocidad = null;
        this.body.gravity = this._gravedad;
        this._gravedad = null;
        this.updating = true;
    };

    Player.prototype.walk = function () {
        this.loadTexture('boy_run');
        this.animations.add('walk');
        this.animations.play('walk', 10, true);
        this.jumping = false;
        this.sliding = false;
    };

    Player.prototype.jump = function () {

        if (this.body.touching.down) {
            this.body.velocity.y -= 900;
        }
        this.loadTexture('boy_jump');
        this.animations.add('jump');
        this.animations.play('jump', 10, true);
        this.jumping = true;
        this.sliding = false;
    };

    Player.prototype.slide = function () {
        this.loadTexture('boy_slide');
        this.animations.add('slide');
        this.animations.play('slide', 10, true);
        this.jumping = false;
        this.sliding = true;
    };

    Player.prototype.dead = function () {
        this.loadTexture('boy_dead');
        this.animations.add('dead');
        this.animations.play('dead', 10, true);
        this.alive = false;
        this.body.velocity.x = 0;
    };

    return Player;
});
