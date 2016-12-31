define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var Phaser = require('phaser');

    function ProgressData(game, corner, order, type, _texto) {

        Phaser.Group.call(this, game);
        game.add.existing(this);

        this.corner = corner;
        this.tipo = type;
        this.order = order;

        var y = 10 + order * 70;
        if (corner == "left") {
            var x = 10;
            this.xdata = x+103;
        }
        if (corner == "right"){
            var x = this.game.world.width -10;
            this.xdata = this.game.world.width -113;
        }

        this.add(new Phaser.Sprite(game, x, y, type));
        this.add(new Phaser.Text(game, this.xdata, y, _texto, { font: '40px IMFellEnglishSC',  fill: '#ffffff' }));
        if (corner == "right"){
            this.getAt(0).scale.setTo(-1,1);
        }
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
        this.getAt(1).text = valor;
        this.fitText();
    };



    ProgressData.prototype.fitText = function () {
        this.getAt(1).x = this.xdata - (this.getAt(1).width / 2 );
    };


    return ProgressData;
});
