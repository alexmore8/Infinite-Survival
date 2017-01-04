define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var Button = require('sprites/game/button');
    var ButtonText = require('sprites/game/button_text');


    function ButtonGroup(game, x, y, float, orientacion) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.posx = x;
        this.posy = y;
        this.float = float;
        this.orientacion = orientacion;
        this.game = game;
    };

    ButtonGroup.prototype = Object.create(Phaser.Group.prototype);
    ButtonGroup.prototype.constructor = ButtonGroup;

    ButtonGroup.prototype.addButtton = function (key, callback,context) {
        var button = this.add(new Button(this.game, 0, 0, key, callback,context));
        this.alignButtons();
        return button;
    };

    ButtonGroup.prototype.addButttonText = function (text,callback,context) {
        var button = this.add(new ButtonText(this.game, 0, 0,callback,context, text));
        this.alignButtons();
        return button;
    };

    ButtonGroup.prototype.alignButtons = function () {
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

    ButtonGroup.prototype.alignHorizontal = function () {
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

    ButtonGroup.prototype.alignVertical = function () {
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
    ButtonGroup.prototype.alignLeft = function () {
        this.x = this.posx;
        this.y = this.posy;
    };
    ButtonGroup.prototype.alignCenter = function () {
        this.x = this.posx - (this.width/2);
        this.y = this.posy;
    };
    ButtonGroup.prototype.alignRight = function () {
        this.x = this.posx - (this.width);
        this.y = this.posy;
    };


    return ButtonGroup;
});
