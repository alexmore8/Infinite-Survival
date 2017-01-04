define(function (require) {

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


    function Game() {
    }

    Game.prototype = {
        preload: function () {
            _.extend(this, mainConstants);
            _.extend(this, inputEvents);

            this.game.time.advancedTiming = true;
            this.running = true;
        },
        create: function () {
            this.background = new Background(this.game, this.LEVELSPEED/100);
            this.suelo = new Muro(this.game, 'suelo');
            this.coin = new Coin(this.game, 1000, this.COINHEIGHT);
            this.player = new Player(this.game, 500, 0, 'boy_run');
            this.player.events.onOutOfBounds.add(this.gameOver, this);
            this.coin.events.onOutOfBounds.addOnce(this.newCoin, this);


            this.powers = new ProgressGroup(this.game, 10, 10, "left", "vertical");
            this.life = this.powers.addProgressStatus("life", this.player.health);
            this.power = this.powers.addProgressStatus("power", this.player.power);

            this.achievments = new ProgressGroup(this.game, this.game.world.width -10, 10, "right", "vertical");
            this.coins = this.achievments.addProgressData("coins", 0, true);
            this.distance = this.achievments.addProgressData("distance", 0, true);


            this.buttons = new ButtonGroup(this.game,this.game.world.centerX,10, "center", "horizontal");
            this.buttons.addButtton("pause", this.pausa, this);
            var effectsbutton = this.buttons.addButtton("sound", function () {
                if (this.game.effectsvolume == 0){
                    this.game.effectsvolume = this.game.EFFECTVOLUME;
                    this.basicbuttons();
                } else {
                    this.game.effectsvolume = 0;
                    this.extrabuttons();
                }
            }, null);
            if (this.game.effectsvolume == 0){
                effectsbutton.extrabuttons();
            }
            var soundbutton = this.buttons.addButtton("music", function () {
                if (this.game.musicvolume == 0){
                    this.game.musicvolume = this.game.MUSICVOLUME;
                    this.game.music.volume = this.game.musicvolume;
                    this.basicbuttons();
                } else {
                    this.game.musicvolume = 0;
                    this.game.music.volume = 0;
                    this.extrabuttons();
                }
            }, null);
            if (this.game.musicvolume == 0){
                soundbutton.extrabuttons();
            }
            this.buttons.addButtton("reboot", function () {
                this.game.state.start('game');
            }, null);

            this.initGameController();

        },


        update: function () {
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);

            if (this.running) {
                this.game.debug.text(this.game.time.fps, 1000, 100, 'white');
                if (this.player.body.touching.down) {
                    this.player.body.velocity.x = this.LEVELSPEED;
                    if (this.player.jumping == true) this.player.walk();
                }
                else {
                    this.player.body.velocity.x = 0;
                    if (this.player.jumping == false) this.player.jump();
                }

                if (this.coin.body.x + this.coin.width < 0)
                    this.newCoin();


                this.power.porcentaje(this.player.power);
                this.distance.numero(this.player.distancia);
            }
        },
        render: function () {
            if (this.DEBUG && this.running) {
                //this.game.debug.bodyInfo(this.player, 32, 32);
                this.game.debug.body(this.player);
                this.game.debug.body(this.coin);
            }
        },
        playerHit: function (player, blockedLayer) {
            if (player.body.touching.right) {
                this.player.dead();
                this.game.time.events.add(1500, this.gameOver, this);
            }
        },
        takeCoin: function (player, coin) {
            this.coins.numero(this.coins.numero() + this.coin.valor);
            this.coin.takeCoin();
            this.newCoin();
        },
        newCoin: function () {
            this.coin.destroy();
            this.coin = new Coin(this.game, this.game.world.width + this.game.world.width*Math.random(), this.COINHEIGHT);
        },
        initGameController: function () {
            this.game.input.keyboard.createCursorKeys();
            var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onDown.add(this.player.jump, this.player);
            var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onDown.add(this.player.slide, this.player);
            var powerKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
            powerKey.onDown.add(function () { this.poder = 0;   this.pausa(); }, this);
        },
        gameOver: function () {
            var database = new Firebase();
            database.insertDistance("manso92", this.player.distancia);
            this.game.state.states['gameover'].monedas = this.coins.numero();
            this.game.state.states['gameover'].distancia = parseInt(this.player.distancia);
            this.game.state.start('gameover');
        },
        pausa: function(){
            if(! this.running){
                this.menupausa.destroy();
                this.backgrounblack.destroy();
                this.running = true;
                this.startSprites();
            } else {
                this.running = false;
                this.stopSprites();

                this.backgrounblack = this.game.add.image(0, 0, "black_background");
                this.backgrounblack.alpha = 0.6;
                this.menupausa = new PauseMenu(this.game, this, this.pausa);
            }
        },
        startSprites: function () {
            this.player.reanudar();
            this.suelo.reanudar();
            this.coin.reanudar();
            this.background.reanudar();
        },
        stopSprites: function () {
            this.player.parar();
            this.suelo.parar();
            this.coin.parar();

            this.background.parar();
        }
    };
    return Game;
});
