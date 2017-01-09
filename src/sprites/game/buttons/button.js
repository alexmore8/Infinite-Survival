define(function (require) {

    'use strict';

    var Phaser = require('phaser');

    function Button(game, x, y, key, callback,context) {
        Phaser.Button.call(this,game, x, y, "btn_"+key, callback, context, 2, 0, 1);
        game.add.existing(this);
        this.scale.setTo(0.4);
    };

    Button.prototype = Object.create(Phaser.Button.prototype);
    Button.prototype.constructor = Button;


    Button.prototype.basicbuttons = function () {
        this.setFrames(2, 0, 1)
    };
    Button.prototype.extrabuttons = function () {
        this.setFrames(6, 4, 5);
    };

    return Button;
});
