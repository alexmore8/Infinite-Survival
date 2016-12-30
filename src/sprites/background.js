define(function (require, exports, module, Config) {

    'use strict';

    var Phaser = require('phaser');


    function Background(game, speed) {
        Phaser.Group.call(this, game, null, name);
        game.add.existing(this);

        this.background_vel = speed;


        for (var i = 0; i < 3; i++) {
            this.add(new Phaser.Sprite(game, i*1023, 0, 'background'));
        }
    };

    Background.prototype = Object.create(Phaser.Group.prototype);
    Background.prototype.constructor = Background;

    Background.prototype.update = function () {
        for (var i = 0; i < 3; i++) {
             this.getAt(i).x =
                 (this.getAt(i).x <= -1024) ?
                    (this.getAt(i == 0 ? 2 : i-1).x + 1023) - this.background_vel :
                     this.getAt(i).x - this.background_vel;

        }
    };

    return Background;
});
