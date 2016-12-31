define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');

    var Background = require('sprites/background');
    var Player = require('sprites/player');
    var Muro = require('sprites/muros');
    var Coin = require('sprites/coin');



    var ProgresStatus = require('sprites/game/progress_status');
    var ProgresData = require('sprites/game/progress_data');


    function Game() {
        this.background = null;

        this.life = null;
        this.suelo = null;
        this.floor = null;
        this.lastFloor = null;
        this.lastCliff = false;

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
            this.player = new Player(this.game, 500, 0, 'boy_run');
            this.coin = new Coin(this.game, 1000, 280);
            this.life = new ProgresData(this.game, "left", 0, "coins", "0");
            this.life = new ProgresStatus(this.game, "right", 1, "shield",50);
            this.life = new ProgresStatus(this.game, "left", 2, "power",50);
            this.life = new ProgresData(this.game, "right", 0, "coins", "00");
            this.life = new ProgresData(this.game, "left", 1, "coins", "000");
            this.life = new ProgresData(this.game, "right", 2, "gems", "0000");

            //this.game.add.text(-1000, 200, this.game.time.fps, { font: '100px IMFellEnglishSC',  fill: '#000000' });


            this.initGameController();
        },


        update: function () {
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);

            this.game.debug.text(this.game.time.fps, 1000, 100, 'white');


            if (this.player.body.touching.down) {
                this.player.body.velocity.x = this.LEVELSPEED;
                if (this.player.jumping == true)
                    this.player.walk();
            }
            else {
                this.player.body.velocity.x = 0;
                if (this.player.jumping == false)
                    this.player.jump();
            }


        },
        playerHit: function (player, blockedLayer) {
            if (player.body.touching.right) {
                this.player.alive = false;
                this.player.body.velocity.x = 0;
                this.player.loadTexture('boy_dead');
                this.game.time.events.add(1500, this.gameOver, this);
            }
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
