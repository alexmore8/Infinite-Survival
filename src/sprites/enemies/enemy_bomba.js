define(function (require) {

    'use strict';

    var Enemy = require('enemy');

    function Enemy_bomba(game, x , position) {
        Enemy.call( this, game, x, 0, 'bomba');
        this.scale.setTo(0.8);
        this.body.setCircle(30,11,36);

        if (position == "air")
            this.y = this.game.world.height-360;
        if (position == "floor"){
            this.y = this.game.world.height - (this.TILESIZE+this.height) + 10;
        }
    };

    Enemy_bomba.prototype = Object.create(Enemy.prototype);
    Enemy_bomba.prototype.constructor = Enemy_bomba;

    return Enemy_bomba;
});
