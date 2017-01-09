define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');

    function Explosion(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'explosion');
		this.x = this.x - this.width/2;
		this.y = this.y - this.height;
        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.explosionsound = game.add.audio("sound_explosion");
        this.explosionsound.play("",0,game.effectsvolume);

        this.body.velocity.x = -game.LEVELSPEED;
        this.loadTexture('explosion');
        this.animations.add('explosionanim');
        this.animations.play('explosionanim', 20, false,true);
    };

    Explosion.prototype = Object.create(Phaser.Sprite.prototype);
    Explosion.prototype.constructor = Explosion;


    Explosion.prototype.update = function () {
        console.log();
    };
    Explosion.prototype.kill = function () {
        this.destroy();
    };
    Explosion.prototype.debug = function () { this.game.debug.body(this); };

    return Explosion;
});
