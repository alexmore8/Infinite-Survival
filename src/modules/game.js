define(function (require, exports, module, Config) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents = require('modules/parts/input-events');
    var Phaser = require('phaser');

    var player = require('sprites/player');

    function Game() {
        this.background = null;

        this.life = null;
        this.coin = null;
        this.puntuacion = null;
        this.suelo = null;
        this.floor = null;
        this.lastFloor = null;
        this.lastCliff = false;
        this.plataforma = null;
        this.plataformas = null;
        this.lastPlatform = null;
        this.lastCliffplataforma = false;
        this.cursor = null;

    }

    Game.prototype = {
        preload: function () {

            // Define movement constants
            _.extend(this, mainConstants);

            // Add key handlers
            _.extend(this, inputEvents);


            this.game.time.advancedTiming = true;

            this.LEVELSPEED          = -500;
            this.MAXLEVEL            = -500;
            this.TILESIZE            = 128;
            this.PROBCLIFF           = 0.3;
            this.NUMTILES            = 16;
            this.PADDINGPLATAFORMA   = 1500;

            // Cargamos tres fondos de pantalla para ir moviéndolos y dar una sensación de movimiento
            //this.background = this.game.add.image(0, 0, 'background');
            //this.background2 = this.game.add.image(1023, 0, 'background');
            //this.background3 = this.game.add.image(2046, 0, 'background');


            this.life = this.game.add.image(10, 10, 'life').scale.setTo(0.5);
            this.life_progress = this.game.add.image(73, 26, 'lifeprogress').scale.setTo(0.5);
        },
        create: function () {
            var newItem;

            //game params
            this.levelSpeed = -500;
            this.tileSize = 128;
            this.probCliff = 0.4;

            //initiate groups, we'll recycle elements
            this.suelo = this.game.add.group();
            this.suelo.enableBody = true;

            for (var i = 0; i < 20; i++) {
                newItem = this.suelo.create(i * this.tileSize, this.game.world.height - this.tileSize, 'floor');
                newItem.body.immovable = true;
                newItem.body.velocity.x = this.levelSpeed;
                this.game.physics.enable(newItem, Phaser.Physics.ARCADE);
            }

            //keep track of the last floor
            this.lastFloor = newItem;

            //keep track of the last element
            this.lastCliff = false;


            //create player
            this.player = this.game.add.sprite(500, 0, 'boy_run');
            this.player.scale.setTo(1);

            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.jumping = false;

            //enable physics on the player
            //this.game.physics.arcade.enable(this.player);

            //player gravity746
            this.player.body.gravity.y = 2500;
            this.player.body.velocity.y = - this.levelSpeed;

            // Animamos el sprite del jugador
            this.player.animations.add('walk');
            this.player.animations.play('walk', 20, true);
            this.player.body.collideWorldBounds = true;

            //properties when the player is ducked and standing, so we can use in update()
            var playerDuckImg = this.game.cache.getImage('boy_slide');
            this.player.duckedDimensions = {width: playerDuckImg.width, height: playerDuckImg.height};
            this.player.standDimensions = {width: this.player.width, height: this.player.height};
            this.player.anchor.setTo(0.5, 1);

            //the camera will follow the player in the world
            this.game.camera.follow(this.player);


            //init game controller
            this.initGameController();


        },


        update: function () {
            //collision
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);

            this.game.debug.text(this.game.time.fps, 1000, 100, 'white');

            //only respond to keys and keep the speed if the player is alive
            if (this.player.alive) {

                if (this.player.body.touching.down) {
                    this.player.body.velocity.x = -this.levelSpeed;
                    if (this.player.jumping == true) {
                        this.player.loadTexture('boy_run');
                        this.player.animations.play('walk', 10, true);
                        this.player.jumping = false;
                    }
                }
                else {
                    this.player.body.velocity.x = 0;
                    if (this.player.jumping == false) {
                        /*this.player.loadTexture('boy_jump');
                        this.player.animations.add('jump');
                        this.player.animations.play('jump', 10, true);
                        */this.player.jumping = true;
                    }
                }


                if (this.cursors.up.isDown) {
                    this.playerJump();
                }
                else if (this.cursors.down.isDown) {
                    this.playerDuck();
                }

                if (!this.cursors.down.isDown && this.player.isDucked && !this.pressingDown) {
                    //alert();

                    //this.player.loadTexture('boy_run');
                    //this.player.animations.play('walk', 10, true);
                    //change image and update the body size for the physics engine
                    //this.player.loadTexture('boy_run');
                    //this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
                    //this.player.isDucked = false;
                }

                //restart the game if reaching the edge
                if (this.player.x <= -this.tileSize) {
                    this.game.state.start('game');
                }
                if (this.player.y >= this.game.world.height + this.tileSize) {
                    this.game.state.start('game');
                }
            }

            //generate further terrain
            this.generateTerrain();

        },
        generateTerrain: function () {
            var i, salto = 0;
            for (i = 0; i < this.NUMTILES; i++) {
                if (this.suelo.getAt(i).body.x <= -this.TILESIZE) {

                    if ((Math.random() < this.PROBCLIFF) && !this.lastCliff) {
                        salto = 1;
                        this.lastCliff = true;
                    }
                    else
                        this.lastCliff = false;

                    this.suelo.getAt(i).body.x = this.lastFloor.body.x + this.TILESIZE + salto * this.TILESIZE * 2.5;
                    if (salto == 1) {
                        this.suelo.getAt(i).loadTexture('floorl');
                        var j = i == 0 ? this.NUMTILES - 1 : i - 1;
                        this.suelo.getAt(j).loadTexture('floorr');
                    } else {
                        this.suelo.getAt(i).loadTexture('floor');
                    }
                    this.lastFloor = this.suelo.getAt(i);
                    break;
                }
            }
        },
        /*playerHit: function (player, blockedLayer) {
            //if hits on the right side, die
            if (player.body.touching.right) {

                //set to dead (this doesn't affect rendering)
                this.player.alive = false;

                //stop moving to the right
                this.player.body.velocity.x = 0;

                //change sprite image
                this.player.loadTexture('boy_dead');

                //go to gameover after a few miliseconds
                this.game.time.events.add(1500, this.gameOver, this);
            }
        },*/
        initGameController: function () {

            //move player with cursor keys
            this.cursors = this.game.input.keyboard.createCursorKeys();
            var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            // When the 'upKey' is pressed, it will call the 'start' function once
            upKey.onDown.add(this.playerJump, this);
            var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            // When the 'upKey' is pressed, it will call the 'start' function once
            downKey.onDown.add(this.playerDuck, this);


        },
        gameOver: function () {
            this.game.state.start('game');
        },
        playerJump: function () {
            if (this.player.body.touching.down) {
                this.player.body.velocity.y -= 900;
            }
        },
        playerDuck: function () {
            this.player.loadTexture('boy_slide');
            this.player.animations.add('slide');
            this.player.animations.play('slide', 30, true);
            this.player.isDucked = true;
        },
        render: function () {
        }

    };

    return Game;
});
