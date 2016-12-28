define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');

    var Player = require('sprites/player');
    var Muro = require('sprites/muros');

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

            this.life = this.game.add.image(10, 10, 'life').scale.setTo(0.5);
            this.life_progress = this.game.add.image(73, 26, 'lifeprogress').scale.setTo(0.5);
        },
        create: function () {
            this.suelo = new Muro(this.game, 'suelo');
            this.player = new Player(this.game, 500, 0, 'boy_run');
            this.game.camera.follow(this.player);
            this.initGameController();
        },


        update: function () {
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);

            this.game.debug.text(this.game.time.fps, 1000, 100, 'white');


                if (this.player.body.touching.down) {
                    this.player.body.velocity.x = -this.LEVELSPEED;
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
