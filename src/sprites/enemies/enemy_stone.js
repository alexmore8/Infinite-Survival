define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_stone(game, x) {
        Enemy.call( this, game, x, 0, 'stone');
        this.scale.setTo(1.2);
        this.body.setCircle(70,-8,-10);
        this.y = game.world.height-(this.height+game.TILESIZE);
    };

    Enemy_stone.prototype = Object.create(Enemy.prototype);
    Enemy_stone.prototype.constructor = Enemy_stone;

    return Enemy_stone;
});
