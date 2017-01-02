define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var ProgressStatus = require('sprites/game/progress_status');
    var ProgressData = require('sprites/game/progress_data');


    function ProgressGroup(game, x, y, float, orientacion) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.posx = x;
        this.posy = y;
        this.float = float;
        this.orientacion = orientacion;
        this.game = game;
    };

    ProgressGroup.prototype = Object.create(Phaser.Group.prototype);
    ProgressGroup.prototype.constructor = ProgressGroup;

    ProgressGroup.prototype.addProgressData = function (type, texto, inverse) {
        this.add(new ProgressData(this.game, 0, 0, type, texto, inverse));
        this.alignBars();
        return this.getAt(this.length -1);
    };

    ProgressGroup.prototype.addProgressStatus = function (type, porcentaje, inverse) {
        this.add(new ProgressStatus(this.game, 0, 0, type, porcentaje, inverse));
        this.alignBars();
        return this.getAt(this.length -1);
    };

    ProgressGroup.prototype.alignBars = function () {
        switch  (this.orientacion){
            case "horizontal":
                this.alignHorizontal();    break;
            case "vertical":
                this.alignVertical();      break;
            default:
                break;
        }
        switch(this.float) {
            case "right":
                this.alignRight();       break;
            case "left":
                this.alignLeft();        break;
            case "center":
                this.alignCenter();      break;
            default:
                this.alignCenter();      break;
        }
    };

    ProgressGroup.prototype.alignHorizontal = function () {
        var width = 0;
        for (var i=0 ; i<this.length ; i++){
            if (this.getAt(i).espejado){
                this.getAt(i).x = width + this.getAt(i).width;
            } else {
                this.getAt(i).x = width;
            }
            this.getAt(i).y = 0;
            width += this.getAt(i).width + 10;
        }
    };

    ProgressGroup.prototype.alignVertical = function () {
        var height = 0;
        for (var i=0 ; i<this.length ; i++){
            if (this.getAt(i).espejado){
                this.getAt(i).x = + this.getAt(i).width;
            } else {
                this.getAt(i).x = 0;
            }
            this.getAt(i).y = height;
            height += this.getAt(i).height + 10;
        }
    };
    ProgressGroup.prototype.alignLeft = function () {
        this.x = this.posx;
        this.y = this.posy;
    };
    ProgressGroup.prototype.alignCenter = function () {
        this.x = this.posx - (this.width/2);
        this.y = this.posy;
    };
    ProgressGroup.prototype.alignRight = function () {
        this.x = this.posx - (this.width);
        this.y = this.posy;
    };


    return ProgressGroup;
});
