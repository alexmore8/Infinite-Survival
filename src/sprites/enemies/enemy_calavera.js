define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_calavera(game, x, position) {
        Enemy.call( this, game, x, 0, 'calavera');
        this.scale.setTo(0.8);
        this.body.setCircle(45,0,6);

        if (position == "air")
            this.y = this.game.world.height-360;
        if (position == "floor"){
            this.y = game.world.height-(this.height+game.TILESIZE)+12;
        }
        this.golpe = 100;
    };

    Enemy_calavera.prototype = Object.create(Enemy.prototype);
    Enemy_calavera.prototype.constructor = Enemy_calavera;
    
    return Enemy_calavera;
});
