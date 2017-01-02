define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');
    var Moment = require('moment');

    var Background = require('sprites/background');
    var Player = require('sprites/player');
    var Muro = require('sprites/muros');
    var Coin = require('sprites/coin');



    var ButtonGroup = require('sprites/game/button_group');
    var ProgresStatus = require('sprites/game/progress_status');
    var ProgresData = require('sprites/game/progress_data');


    function Game() {
    }

    Game.prototype = {
        preload: function () {
            _.extend(this, mainConstants);
            _.extend(this, inputEvents);

            this.game.time.advancedTiming = true;

        },
        create: function () {
            this.background = new Background(this.game, this.LEVELSPEED/100);
            this.suelo = new Muro(this.game, 'suelo');
            this.coin = new Coin(this.game, 1000, this.COINHEIGHT);
            this.player = new Player(this.game, 500, 0, 'boy_run');
            this.player.events.onOutOfBounds.add(this.gameOver, this);
            this.coin.events.onOutOfBounds.addOnce(this.newCoin, this);



            this.coins = new ProgresData(this.game, "right", 0, "coins", 0);
            this.distance = new ProgresData(this.game, "right", 1, "distance", 0);

            this.life = new ProgresStatus(this.game, "left", 0, "life",100);
            this.power = new ProgresStatus(this.game, "left", 1, "power", 0);

            this.buttons = new ButtonGroup(this.game,this.game.world.centerX,10, "center");
            this.buttons.addButtton("pause", null, null);
            this.buttons.addButtton("sound", null, null);
            this.buttons.addButtton("settings", null, null);

            this.initGameController();
            this.inicio = Moment();
        },


        update: function () {
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);

            this.game.debug.text(this.game.time.fps, 1000, 100, 'white');
            if (this.player.body.touching.down) {
                this.player.body.velocity.x = this.LEVELSPEED;
                if (this.player.jumping == true) this.player.walk();
            }
            else {
                this.player.body.velocity.x = 0;
                if (this.player.jumping == false) this.player.jump();
            }

            this.distance.numero((Moment().diff(this.inicio))/500);
            //console.log((Moment().diff(this.inicio)));

        },
        playerHit: function (player, blockedLayer) {
            if (player.body.touching.right) {
                this.player.dead();
                this.game.time.events.add(1500, this.gameOver, this);
            }
        },
        takeCoin: function (player, coin) {
            this.coins.numero(this.coins.numero() + this.coin.valor);
            this.newCoin();
        },
        newCoin: function () {
            this.coin.destroy();
            this.coin = new Coin(this.game, this.game.world.width + this.game.world.width*Math.random(), this.COINHEIGHT);
            this.coin.events.onOutOfBounds.addOnce(this.newCoin, this);
        },
        initGameController: function () {
            this.game.input.keyboard.createCursorKeys();
            var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onDown.add(this.player.jump, this.player);
            var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onDown.add(this.player.slide, this.player);
        },
        gameOver: function () {
            this.game.state.start('game');
        }
    };
    return Game;
});
