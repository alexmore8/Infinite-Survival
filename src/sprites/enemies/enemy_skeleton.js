define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_skeleton(game, x) {
        Enemy.call( this, game, x, 0, 'skeleton');
        this.y = game.world.height-(this.height+game.TILESIZE)+5;
    };

    Enemy_skeleton.prototype = Object.create(Enemy.prototype);
    Enemy_skeleton.prototype.constructor = Enemy_skeleton;

    return Enemy_skeleton;
});
