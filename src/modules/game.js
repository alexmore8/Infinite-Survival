define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');
    var Arbiter = require ('arbiter');
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
            this.player.events.onOutOfBounds.add(this.playerDead, this);
            this.coin.events.onOutOfBounds.addOnce(this.newCoin, this);


            this.powers = new ProgressGroup(this.game, 10, 10, "left", "vertical");
            this.life = this.powers.addProgressStatus("life", this.player.health);
            this.power = this.powers.addProgressStatus("power", this.player.power);

            this.achievments = new ProgressGroup(this.game, this.game.world.width -10, 10, "right", "vertical");
            this.coins = this.achievments.addProgressData("coins", 0, true);
            this.distance = this.achievments.addProgressData("distance", 0, true);


            this.buttons = new ButtonGroup(this.game,this.game.world.centerX,10, "center", "horizontal");
            this.buttons.addButton("pause", this.pausa, this);
            var effectsbutton = this.buttons.addButton("sound", this.changesound, null);
            if (this.game.effectsvolume == 0) effectsbutton.extrabuttons();
            var soundbutton = this.buttons.addButton("music", this.changemusic, null);
            if (this.game.musicvolume == 0)   soundbutton.extrabuttons();
            this.buttons.addButton("reboot", function () { this.game.state.start('game'); }, null);



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
                this.suelo.debug();
                this.game.debug.body(this.player);
                this.game.debug.body(this.coin);
            }
        },
        playerHit: function (player, blockedLayer) {
            if (this.player.body.touching.right)
                this.game.time.events.add(1500, this.playerDead, this);
        },
        playerDead: function () {
            if (this.player.alive){
                this.player.dead();
                this.gameOver();
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
            var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.player.jump, this.player);
            var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onDown.add(this.player.jump, this.player);
            var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onDown.add(this.player.slide, this.player);
            var powerKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
            powerKey.onDown.add(function () { this.poder = 0;   this.pausa(); }, this);
            var killKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
            killKey.onDown.add(function () { this.gameOver(); }, this);
            //this.game.touch.onDown.add(this.player.jump, this.player);
        },
        destroGameController: function () {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.UP);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.P);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.K);
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        },
        gameOver: function () {
            this.stopgame();
            this.destroGameController();
            Arbiter.unsubscribe('');
            Arbiter.subscribe('gameovermenu', this.toGameOverMenu, null, this);
            if (localStorage.getItem("username") == undefined) {
                swal({
                        title: "Usuario",
                        text: "Escribe tu nombre de usuario",
                        type: "input",
                        closeOnConfirm: false,
                        animation: "slide-from-top",
                        inputPlaceholder: "nombrechulo63"
                    },
                    function (inputValue) {
                        function testAlfaNumerico(texto) {
                            var numeros = "0123456789abcdefghyjklmnñopqrstuvwxyz";
                            if ((numeros.indexOf(texto.charAt(0), 0) > -1) && (numeros.indexOf(texto.charAt(0), 0) < 10)) return 1;
                            for (var i = 0; i < texto.length; i++) {
                                if (numeros.indexOf(texto.charAt(i), 0) == -1) return 1;
                            }
                            return 0;
                        }

                        if (inputValue === false) return false;

                        if (inputValue === "") {
                            swal.showInputError("Necesitas escribir algo.");
                            return false
                        }

                        if (testAlfaNumerico(inputValue) == 1) {
                            swal.showInputError("Solo puede contener letras minusculas y numeros. Debe comenzar con una letra.");
                            return false;
                        }

                        if (inputValue > 12) {
                            swal.showInputError("El nombre de usuario será de 12 caracteres como máximo.");
                            return false;
                        }

                        localStorage.setItem("username", inputValue);

                        Arbiter.publish('gameovermenu');
                        swal.close();
                    });
            } else {
                this.toGameOverMenu()
            }
        },
        toGameOverMenu: function(){
            this.game.puntuation = true;
            Arbiter.unsubscribe('');
            this.game.username = localStorage.getItem("username");
            var database = new Firebase(this.game.username);
            database.updateData(this.coins.numero(), parseInt(this.player.distancia));
            this.game.state.states['gameover'].monedas = this.coins.numero();
            this.game.state.states['gameover'].distancia = parseInt(this.player.distancia);
            this.game.state.start('gameover');
        },
        pausa: function(){
            if(! this.running){
                this.menupausa.destroy();
                this.backgrounblack.destroy();
                Arbiter.unsubscribe("playGame");
                this.playgame();
            } else {
                this.stopgame();
                this.backgrounblack = this.game.add.image(0, 0, "black_background");
                this.backgrounblack.alpha = 0.6;
                Arbiter.subscribe("playGame", this.pausa,null,  this);
                this.menupausa = new PauseMenu(this.game, this);
            }
        },
        stopgame : function () {
            this.running = false;
            this.stopSprites();
        },
        playgame : function () {
            this.running = true;
            this.startSprites();
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
        },
        changesound: function () {
            if (this.game.effectsvolume == 0){
                this.game.effectsvolume = this.game.EFFECTVOLUME;
                localStorage.removeItem("effectsvolume");
                this.basicbuttons();
            } else {
                this.game.effectsvolume = 0;
                localStorage.setItem("effectsvolume", false);
                this.extrabuttons();
            }
        },
        changemusic: function () {
            if (this.game.musicvolume == 0){
                this.game.musicvolume = this.game.MUSICVOLUME;
                this.game.music.volume = this.game.musicvolume;
                localStorage.removeItem("musicvolume");
                this.basicbuttons();
            } else {
                this.game.musicvolume = 0;
                this.game.music.volume = 0;
                localStorage.setItem("musicvolume", false);
                this.extrabuttons();
            }
        }
    };
    return Game;
});