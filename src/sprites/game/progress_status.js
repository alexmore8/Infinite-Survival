define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var Phaser = require('phaser');

    function ProgresStatus(game, corner, order, type, porcentaje) {

        Phaser.Group.call(this, game);
        game.add.existing(this);

        this._porcentaje = porcentaje;
        this.corner = corner;
        this.tipo = type;
        this.order = order;

        var y = 10 + order * 70;
        if (corner == "left") {
            var x = 10;
            this.cornerfactor = 1;
        }
        if (corner == "right"){
            var x = this.game.world.width -10;
            this.cornerfactor = -1;
        }
        var xprogress = x+(this.cornerfactor * 63);



        this.add(new Phaser.Sprite(game, x, y, type));
        this.add(new Phaser.Sprite(game, xprogress, y+16, type+"progress"));

        this.fitSizes();
    };

    ProgresStatus.prototype = Object.create(Phaser.Group.prototype);
    ProgresStatus.prototype.constructor = ProgresStatus;


    ProgresStatus.prototype.fitSizes = function () {
        this.getAt(0).scale.setTo(this.cornerfactor * 1,1);
        this.getAt(1).scale.setTo(this.cornerfactor * (this._porcentaje/100),1);
    };


    ProgresStatus.prototype.porcentaje = function (porcentaje) {
        this._porcentaje = porcentaje;
        this.fitSizes();
    };


    return ProgresStatus;
});
