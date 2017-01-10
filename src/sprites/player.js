define(function (require) {

    'use strict';

    var Phaser = require('phaser');

    function Player(game, x, y) {

        this.game = game;

        this.health = 100;
        this.power = 0;
        this.distancia = 0;
        this.jumping = false;
        this.sliding = false;
        this.murdering = false;
        this.updating = true;
        this.originalposition = {
            posx: x,
            posy:y
        };

        this.sounds = {
            jump : game.add.audio("sound_player_jump"),
            dead: game.add.audio("sound_player_dead")
        };

        this.powerup = false;
        this.root = "boy_";

		Phaser.Sprite.call(this, game, x, y, 'knight_run');
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.camera.follow(this);

        this.checkWorldBounds = true;
        this.body.gravity.y = game.GRAVITY;
        this.body.velocity.y = game.LEVELSPEED;
        this.walk();
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {
        if (this.updating) {
            this.distancia += 1 / 20;
            if (this.powerup) {
                this.power = this.power <= 0 ? 0 : this.power - 1 / 10;
                if(this.power == 0) this.powerUP();
            }
            else
                this.power = this.power >= 100 ? 100 : this.power + 1 / 20;
            this.health = this.health > 100 ? 100 : this.health + 1 / 30;
        }
    };

    Player.prototype.herir = function (herida) {
        if (!this.powerup)
            this.health -= herida;
    };

    Player.prototype.parar = function () {this._velocidad = this.body.velocity;this.body.velocity = 0;this._gravedad = this.body.gravity;this.body.gravity = 0;this.updating = false;};
    Player.prototype.reanudar = function () {this.body.velocity = this._velocidad;this._velocidad = null;this.body.gravity = this._gravedad;this._gravedad = null;this.updating = true;};

    Player.prototype.walk = function () {
        if (!this.alive) return;
        this.loadAnimation('run');
        this.body.setSize(100, 180, 35, 25);
        this.jumping = this.jumping == undefined ? undefined : false;
        this.sliding = this.sliding == undefined ? undefined : false;
    };

    Player.prototype.jump = function () {
        if (!this.alive || this.jumping == undefined) return;
        if (this.body.touching.down) {
            this.body.velocity.y = -this.game.JUMPVEL;
            this.sounds.jump.play("",0,this.game.effectsvolume);
        }
        this.loadAnimation("jump");
        this.body.setSize(80, 180, 35, 25);
        this.jumping = this.jumping == undefined ? undefined : true;
        this.sliding = this.sliding == undefined ? undefined : false;
    };

    Player.prototype.slide = function () {
        if (!this.alive || this.sliding == undefined) return;
        this.loadAnimation("slide");
        this.body.setSize(90, 140, 25, 65);
        this.jumping = this.jumping == undefined ? undefined : false;
        this.sliding = this.sliding == undefined ? undefined : true;
    };

    Player.prototype.dead = function () {
        if (this.murdering == undefined) {this.icannotdeath(); return;}
        this.sounds.dead.play("",0,this.game.effectsvolume);
        this.loadAnimation("dead", false);
        this.alive = false;
        this.body.velocity.x = 0;
    };

    Player.prototype.icannotdeath = function () {
        this.x = this.originalposition.posx;
        this.y = this.originalposition.posy;
    };

    Player.prototype.loadAnimation = function (animation, loop) {
        if (loop == undefined) loop = true;
        this.loadTexture(this.root+animation);
        this.animations.add(animation);
        this.animations.play(animation, 10, loop);
    };

    Player.prototype.stopSprites = function () {
        this.animations.stop(null, true);
    };

    Player.prototype.powerUP = function () {
        if(this.powerup == true){
            this.powerup = false;
            this.root = "boy_";
            this.sliding = false;
            this.murdering = false;
            if (this.jumping)
                this.loadAnimation('jump');
            else
                this.loadAnimation('run');
        } else {
            if(this.power != 100) return;
            this.powerup = true;
            this.root = "knight_";
            this.sliding = undefined;
            this.murdering = undefined;
            if (this.jumping)
                this.loadAnimation('jump');
            else
                this.loadAnimation('run');
        }
    };


    return Player;
});
