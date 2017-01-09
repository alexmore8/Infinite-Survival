define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_nitro(game, x, position) {
        Enemy.call( this, game, x, 0, 'nitro');
        if (position == "air")
            this.y = this.game.world.height-360;
        if (position == "floor"){
            this.y = game.world.height-(this.height+game.TILESIZE)+12;
        }
    };

    Enemy_nitro.prototype = Object.create(Enemy.prototype);
    Enemy_nitro.prototype.constructor = Enemy_nitro;

    return Enemy_nitro;
});
