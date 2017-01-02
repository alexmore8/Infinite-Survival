define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var Button = require('sprites/game/button');


    function ButtonGroup(game, x, y, float) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.posx = x;
        this.posy = y;
        this.float = float;
        this.game = game
    };

    ButtonGroup.prototype = Object.create(Phaser.Group.prototype);
    ButtonGroup.prototype.constructor = ButtonGroup;

    ButtonGroup.prototype.addButtton = function (key, callback,context) {
        this.add(new Button(this.game, 0, 0, key, callback,context));
        this.alignButtons();
    };

    ButtonGroup.prototype.alignButtons = function () {
        var width = 0;
        for (var i=0 ; i<this.length ; i++){
            this.getAt(i).x = width;
            this.getAt(i).y = 0;
            width += this.getAt(i).width + 10;
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
