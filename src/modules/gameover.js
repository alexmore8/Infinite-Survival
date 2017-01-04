define(function(require, exports, module) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');
    var Moment = require('moment');
    var Firebase = require('firebase');

    var Background = require('sprites/background');
    var Player = require('sprites/player');
    var Muro = require('sprites/muros');
    var Coin = require('sprites/coin');


    var ButtonGroup = require('sprites/game/button_group');
    var ProgressGroup = require('sprites/game/progress_group');
    var PauseMenu = require('sprites/game/pause_menu');


    function GameOver() {
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    }

    GameOver.prototype = {
        create: function () {
            this.monedas = this.monedas == undefined ? 0 : this.monedas;
            this.distancia = this.distancia == undefined ? 0 : this.distancia;
            this.game.add.image(0,0,'bg_scores');
            this.menu = this.game.add.image(0, 0, "menu_horizontal");
            this.menu.scale.set(0.8);
            this.menu.x = this.game.world.centerX - (this.menu.width/2);
            this.menu.y = this.game.world.centerY - (this.menu.height/2);

            this.title = this.game.add.text(0, this.menu.y+14, "GameOver", { font: '50px IMFellEnglishSC',  fill: '#000000' });
            this.title.x = this.game.world.centerX - this.title.width/2;


            this.powers = new ProgressGroup(this.game, 480, 200, "center", "vertical");
            this.coins = this.powers.addProgressData("coins", this.monedas);
            this.distance = this.powers.addProgressData("distance", this.distancia);


            this.buttons = new ButtonGroup(this.game, 480, 350, "center", "horizontal");
            this.buttons.addButtton("home", function () { this.game.state.start('menu') } , this);
            this.buttons.addButtton("reboot", function () { this.game.state.start('game') } , this);

            this.buttons = new ButtonGroup(this.game, 515, 530, "center", "horizontal");
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
            this.buttons.scale.setTo(0.7);

        },
        changebutton: function(){
            this.game.state.start('game');
        }
    };

    return GameOver;
});
