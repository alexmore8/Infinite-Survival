define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Phaser = require('phaser');

    function ProgresStatus(game, x, y, type, porcentaje ,inverse) {

        Phaser.Group.call(this, game);
        game.add.existing(this);

        this._porcentaje = porcentaje;
        this.espejado = inverse;

        if ((inverse == undefined) || (inverse == false)){
            this.cornerfactor = 1;
        }else {
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
        this._porcentaje = porcentaje > 100 ? 100 : porcentaje < 0 ? 0 : porcentaje;
        this.fitSizes();
    };


    return ProgresStatus;
});
