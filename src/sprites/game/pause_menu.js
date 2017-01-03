define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var Button = require('sprites/game/button');
    var ButtonText = require('sprites/game/button_text');
    var ButtonGroup = require('sprites/game/button_group');
    var ProgressStatus = require('sprites/game/progress_status');
    var ProgressData = require('sprites/game/progress_data');
    var ProgressGroup = require('sprites/game/progress_group');


    function PauseMenu(game, playeritems, callback) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.game = game;


        this.add(new Phaser.Sprite(game, 0, 0, "pause_menu"));
        this.getAt(this.length -1).scale.setTo(0.8);
        this.x = this.game.world.centerX - (this.getAt(this.length -1).width/2);
        this.y = this.game.world.centerY - (this.getAt(this.length -1).height/2);

        this.add(new Phaser.Text(game, 195, 6, "Menu", { font: '50px IMFellEnglishSC',  fill: '#000000' }));

        this.buttons = this.add(new ButtonGroup(game, (this.width/2), 120, "center", "horizontal"));
        this.buttons.addButtton("play", callback, playeritems);
        this.buttons.addButtton("reboot", function () { game.state.start('game') } , this);
        this.buttons.addButtton("home", function () { game.state.start('menu') } , this);

        this.powers = this.add(new ProgressGroup(this.game, (this.width/2), 195, "center", "vertical"));
        this.life = this.powers.addProgressStatus("life", playeritems.player.health);
        this.power = this.powers.addProgressStatus("power", playeritems.player.power);


        this.coins = this.add(new ProgressData(game, 130, 330, "coins", playeritems.coins.numero()));
        this.distance = this.add(new ProgressData(game, 380, 388, "distance", playeritems.distance.numero(), true));


        this.buttons = this.add(new ButtonGroup(game, (this.width/2), 450, "center", "horizontal"));
        this.buttons.addButtton("facebook", function () {
            var win = window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }, this);

        this.buttons.addButtton("twitter", function () {
            var win = window.open("https://twitter.com/home?status=Acabo%20de%20probar%20Infinite%20Survival,%20%C2%BFpuedes%20superarme?%20https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        } , this);
        this.buttons.addButtton("google", function () {
            var win = window.open("https://plus.google.com/share?url=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }, this);
        /*this.add(new ProgresData(game,"right", 0, "distance", playeritems.distancia));
        this.getAt(this.length -1).x = 0;
        this.getAt(this.length -1).y = 0;
        this.getAt(this.length -1).x = this.width - this.getAt(this.length -1).width;
        console.log(this.width - this.getAt(this.length -1).width);
        this.getAt(this.length -1).y = this.height - this.getAt(this.length -1).height;
        console.log(this.height - this.getAt(this.length -1).height);
*/


    };

    PauseMenu.prototype = Object.create(Phaser.Group.prototype);
    PauseMenu.prototype.constructor = PauseMenu;

    /*PauseMenu.prototype.addButtton = function (key, callback,context) {
        this.add(new Button(this.game, 0, 0, key, callback,context));
        this.alignButtons();
    };

    PauseMenu.prototype.addButttonText = function (callback,context, text) {
        this.add(new ButtonText(this.game, 0, 0,callback,context, text));
        this.alignButtons();
    };

    PauseMenu.prototype.alignButtons = function () {
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
    PauseMenu.prototype.alignLeft = function () {
        this.x = this.posx;
        this.y = this.posy;
    };
    PauseMenu.prototype.alignCenter = function () {
        this.x = this.posx - (this.width/2);
        this.y = this.posy;
    };
    PauseMenu.prototype.alignRight = function () {
        this.x = this.posx - (this.width);
        this.y = this.posy;
    };*/


    return PauseMenu;
});
