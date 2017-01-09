define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_tnt(game, x, position) {
        Enemy.call( this, game, x, 0, 'tnt');
        if (position == "air")
            this.y = this.game.world.height-360;
        if (position == "floor"){
            this.y = game.world.height-(this.height+game.TILESIZE)+12;
        }
        this.golpe = 33;
    };

    Enemy_tnt.prototype = Object.create(Enemy.prototype);
    Enemy_tnt.prototype.constructor = Enemy_tnt;

    return Enemy_tnt;
});
