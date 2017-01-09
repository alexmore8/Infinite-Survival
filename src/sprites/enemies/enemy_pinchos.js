define(function (require) {

    'use strict';
    
    var Enemy = require('enemy');

    function Enemy_pinchos(game, x) {
        Enemy.call( this, game, x, 0, 'pinchos');
        this.y = game.world.height-(this.height+game.TILESIZE)+1;
    };

    Enemy_pinchos.prototype = Object.create(Enemy.prototype);
    Enemy_pinchos.prototype.constructor = Enemy_pinchos;
    
    return Enemy_pinchos;
});
