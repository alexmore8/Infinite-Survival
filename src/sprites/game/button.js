define(function (require, exports, module, Config) {

    'use strict';

    var Phaser = require('phaser');

    function Button(game, x, y, key, callback,context) {
        Phaser.Button.call(this,game, x, y, "btn_"+key, callback, this, 2, 0, 1, 3);
        game.add.existing(this);
        this.scale.setTo(0.5);
    };

    Button.prototype = Object.create(Phaser.Button.prototype);
    Button.prototype.constructor = Button;

    return Button;
});
