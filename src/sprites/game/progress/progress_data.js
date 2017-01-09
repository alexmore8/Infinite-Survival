define(function (require) {

    'use strict';

    var Phaser = require('phaser');

    function ProgressData(game, x, y,  type, _texto, inverse) {

        Phaser.Group.call(this, game);
        game.add.existing(this);

        this.espejado = inverse;
        if ((inverse == undefined) || (inverse == false)){
            this.cornerfactor = 1;
        }else {
            this.cornerfactor = -1;
        }
        this.xdata = x+(this.cornerfactor * 109);

        this.add(new Phaser.Sprite(game, x, y, type));
        this.add(new Phaser.Text(game, this.xdata, y, _texto, { font: '40px IMFellEnglishSC',  fill: '#ffffff' }));
        this.getAt(0).scale.setTo(this.cornerfactor,1);
        this.fitText();
    };

    ProgressData.prototype = Object.create(Phaser.Group.prototype);
    ProgressData.prototype.constructor = ProgressData;

    ProgressData.prototype.texto = function (valor) {
        this.getAt(1).text = valor;
        this.fitText();
    };

    ProgressData.prototype.numero = function (valor) {
        if (valor == undefined){
            return parseInt(this.getAt(1).text);
        }
        this.getAt(1).text = Math.floor(valor);
        this.fitText();
    };

    ProgressData.prototype.fitText = function () {
        this.getAt(1).x = this.xdata - (this.getAt(1).width / 2 );
    };

    return ProgressData;
});
