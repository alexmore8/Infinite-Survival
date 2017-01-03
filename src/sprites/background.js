define(function (require) {

    'use strict';

    var Phaser = require('phaser');


    function Background(game, speed) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);

        this.background_vel = speed;



        for (var i = 0; i < 3; i++) {
            this.add(new Phaser.Sprite(game, i*1023, 0, 'bg_game'));
        }
    };

    Background.prototype = Object.create(Phaser.Group.prototype);
    Background.prototype.constructor = Background;

    Background.prototype.update = function () {
        if (this.running)
        for (var i = 0; i < 3; i++) {
             this.getAt(i).x =
                 (this.getAt(i).x <= -1024) ?
                    (this.getAt(i == 0 ? 2 : i-1).x + 1023) - this.background_vel :
                     this.getAt(i).x - this.background_vel;

        }
    };


    Background.prototype.parar = function () {
        this.running = false;
    };

    Background.prototype.reanudar = function () {
        this.running = true;
    };

    return Background;
});
