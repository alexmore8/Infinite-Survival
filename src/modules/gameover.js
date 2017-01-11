define(function(require, exports, module) {

    'use strict';

    var Phaser = require('phaser');
    var Firebase = require('firebase');
    var Arbiter = require ('arbiter');
    var RRSS = require('rrss');
    var ButtonGroup = require('buttongroup');
    var ProgressGroup = require('progressgroup');
    var LeaderBoard = require('leaderboard');
    var DifficultyMenu = require('difficultymenu');


    function GameOver() {
        Phaser.State.call(this);
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    };

    GameOver.prototype = Object.create(Phaser.State.prototype);
    GameOver.prototype.constructor = GameOver;

    GameOver.prototype = {
        create: function () {
            Arbiter.subscribe('coins', this.bestCoins, null, this);
            Arbiter.subscribe('distance', this.bestDistance, null, this);
            Arbiter.subscribe('coinLeaderboard', this.coinLeaderboard, null, this);
            Arbiter.subscribe('distanceLeaderboard', this.distanceLeaderboard, null, this);
            (new Firebase(this.game.username)).bestData();

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
            this.powers.addProgressData("coins",    this.monedas);
            this.powers.addProgressData("distance", this.distancia);

            this.buttons = new ButtonGroup(this.game, 480, 350, "center", "horizontal");
            this.buttons.addButton("home",   function () { Arbiter.unsubscribe(''); this.game.state.start('menu'); }, this);
            this.buttons.addButton("reboot", function () { Arbiter.unsubscribe(''); this.game.state.start('game'); }, this);
            this.buttons.addButton("settings", this.difficultymenu, this);

            this.buttons = new ButtonGroup(this.game, 515, 530, "center", "horizontal");
            this.buttons.addButton("facebook", function () {(new RRSS).facebook(this.distancia);}, this);
            this.buttons.addButton("twitter", function () {(new RRSS).twitter(this.distancia);}, this);
            this.buttons.addButton("google", function () {(new RRSS).google();}, this);
            this.buttons.scale.setTo(0.7);

            this.leaderBoard = new LeaderBoard(this.game, 610 , 180, "distance");
            if (this.game.distanceLeaderboard != undefined)
                this.leaderBoard.setData(this.game.distanceLeaderboard);
            else if (this.game.coinLeaderboard != undefined)
                this.leaderBoard.setData(this.game.distanceLeaderboard);
            Arbiter.subscribe('closemenu', this.closemenu, null, this);
        },
        distanceLeaderboard: function () {
            this.leaderBoard.destroy();
            this.leaderBoard = new LeaderBoard(this.game, 610 , 180, "distance");
            this.leaderBoard.setData(this.game.distanceLeaderboard);
        },
        coinLeaderboard: function () {
            this.leaderBoard.destroy();
            this.leaderBoard = new LeaderBoard(this.game, 610 , 180, "coins");
            this.leaderBoard.setData(this.game.coinLeaderboard);
        },
        bestDistance: function (data) {
            this.game.distanceLeaderboard = data;
            if (this.leaderBoard.type == "distance")   this.distanceLeaderboard();
        },
        bestCoins: function (data) {
            this.game.coinLeaderboard = data;
            if (this.leaderBoard.type == "coins")      this.distanceLeaderboard();
        },
        difficultymenu: function(){
            this.backgrounblack = this.game.add.image(0, 0, "black_background");
            this.backgrounblack.alpha = 0.6;
            this.menu = new DifficultyMenu(this.game);
        },
        closemenu: function () {
            this.menu.destroy();
            this.backgrounblack.destroy();
        },
    };

    return GameOver;
});
