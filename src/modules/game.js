define(function(require, exports, module, Config) {

    'use strict';

    var _             = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var inputEvents   = require('modules/parts/input-events');

    function Game() {
        this.background  = null;
        this.background2 = null;
        this.background3 = null;

        this.initialx = 0;

        this.life = null;
        this.coin = null;
        this.player = null;
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

        preload: function() {

            // Cargamos tres fondos de pantalla para ir moviéndolos y dar una sensación de movimiento
            this.background = this.game.add.image(0,0,'background');
            this.background2 = this.game.add.image(1023,0,'background');
            this.background3 = this.game.add.image(2046,0,'background');

            this.life = this.game.add.image(10,10,'life').scale.setTo(0.5);
            this.life_progress = this.game.add.image(73,26,'lifeprogress').scale.setTo(0.5);

            // Cargamos los sprites de la moneda y del jugador
            this.coin = this.game.add.sprite(1000, 300, 'coins');
            this.player = this.game.add.sprite(this.game.world.width/2-200, this.game.world.height - this.TILESIZE -200, 'player');

            this.initialx = this.game.world.width/2-200;

            this.game.time.advancedTiming = true;
        },
        create: function() {

            // Define movement constants
            _.extend(this, mainConstants);

            // Add key handlers
            _.extend(this, inputEvents);

            // Hacemos que pueda chocar y la ponemos con un tamaño adecuado
            this.game.physics.arcade.enable(this.coin);
            this.coin.scale.setTo(2);
            // Cambiamos las propiedades para colocarla en el punto que queremos y le añadimos velocidad
            this.coin.body.velocity.x = this.LEVELSPEED;
            this.coin.body.y = 600;
            // Animamos la moneda
            this.coin.animations.add('girar');
            this.coin.animations.play('girar', 20, true);






            // Creamos una etiquetaa para la puntuación y lo colocamos
            this.puntuacion = this.game.add.text(30, 150, 'Puntuacion: 0',{ font: '50px Pacifico', fill: '#0000FF' });
            this.puntuacion.fixedToCamera=true;
            this.game.puntuacion = 0;







            // Creamos el muro y vamos colocándolos en la pantalla
            this.suelo = this.game.add.group();
            this.suelo.enableBody = true;
            for(var i=0; i<this.NUMTILES; i++) {
                this.floor = this.suelo.create(i * this.TILESIZE, this.game.world.height - this.TILESIZE, 'floor');
                this.floor.body.immovable = true;
                this.floor.body.velocity.x = this.LEVELSPEED;
            }
            // Guardamos el último suelo y el último salto
            this.lastFloor = this.floor;
            this.lastCliff = false;








            // Creamos la plataforma y vamos colocándolos en la pantalla
            this.plataformas = this.game.add.group();
            this.plataformas.enableBody = true;
            for(var i=0; i<this.NUMTILES; i++) {
                this.plataforma = this.plataformas.create(i * this.TILESIZE - this.PADDINGPLATAFORMA, this.game.world.height - this.TILESIZE - 300, 'platform');
                this.plataforma.body.immovable = true;
                this.plataforma.body.velocity.x = this.LEVELSPEED;
            }
            // Guardamos la última plataforma y el último salto de plataforma
            this.lastPlatform = this.plataforma;
            this.lastCliffplataforma = false;







            // Creamos las colisiones con el player, le ajustamos el tamaño, y le configuramos la física
            this.game.physics.arcade.enable(this.player);
            this.player.scale.setTo(0.4);
            this.player.body.gravity.y = 4000;
            this.player.body.velocity.x = -this.LEVELSPEED;
            this.player.saltando = false;
            // Animamos el sprite del jugador
            var anim = this.player.animations.add('walk');
            anim.play(10, true);





            // Capturamos las teclas del teclado
            this.cursor = this.game.input.keyboard.createCursorKeys();
            // Hacemos que la cámara siga al jugador
            this.game.camera.follow(this.player);
        },

        update: function() {
            // Hacemos que la cámara siga al jugador
            //this.game.camera.follow(this.player);
            // Si se pulsta la tecla de subir
            if ((this.cursor.up.isDown) && (this.player.saltando == false)) {
                // Hacemos que el jugador salte
                this.player.body.y += -3;
                this.player.body.velocity.y = -1600;
                this.player.saltando = true;
            }

            if (! this.player.body.touching.down){
               this.player.body.velocity.x = 0;
            } else {
                alert(this.player.body.x);
                alert(this.game.world.width/2-200);
                if (this.player.body.x < this.game.world.width/2-200){
                    this.player.body.velocity.x = -(this.LEVELSPEED *1,20);
                    alert("Aumentando velocidad");
                } else {
                    this.player.body.velocity.x = -this.LEVELSPEED;
                }
            }


            if ((this.player.body.x + 300 < 0) || (this.player.body.y > this.game.world.height)){
                this.gameOver();
            }





            // Activamos las colisiones
            this.game.physics.arcade.collide(this.player, this.suelo, this.playerHit, null, this);
            this.game.physics.arcade.collide(this.player, this.plataformas, this.playerHit, null, this);
            this.game.physics.arcade.collide(this.player, this.coin, this.takeCoins, null, this);
            this.generarSuelo();
            this.generarPlataformas();
            this.generateCoins();
        },
        playerHit: function(player, blockedLayer) {
            //if hits on the right side, die
            if(this.player.body.touching.right) {
                //this.game.state.start('Game');
            }

            if (! this.player.body.touching.down){
               this.player.body.velocity.x = 0;
            } else {
                this.player.body.velocity.x = -this.LEVELSPEED;
               this.player.saltando = false;
            }
        },
        generarSuelo: function(){
            var i, salto = 0;
            for(i = 0; i < this.NUMTILES; i++) {
                if(this.suelo.getAt(i).body.x <= -this.TILESIZE) {

                    if((Math.random() < this.PROBCLIFF) && !this.lastCliff) {
                        salto = 1;
                        this.lastCliff = true;
                    }
                    else
                        this.lastCliff = false;

                    this.suelo.getAt(i).body.x = this.lastFloor.body.x + this.TILESIZE + salto * this.TILESIZE * 2.5;
                    if (salto == 1){
                        this.suelo.getAt(i).loadTexture('floorl');
                        var j = i==0 ? this.NUMTILES-1 : i-1;
                        this.suelo.getAt(j).loadTexture('floorr');
                    } else {
                        this.suelo.getAt(i).loadTexture('floor');
                    }
                    this.lastFloor = this.suelo.getAt(i);
                    break;
                }
            }
        },
        generarPlataformas: function(){
            var i, salto = 0;
            for(i = 0; i < this.NUMTILES; i++) {
                if(this.plataformas.getAt(i).body.x <= -this.TILESIZE) {

                    if((Math.random() < this.PROBCLIFF*2) && !this.lastCliffplataforma) {
                        salto = 1;
                        this.lastCliffplataforma = true;
                    }
                    else
                        this.lastCliffplataforma = false;

                    this.plataformas.getAt(i).body.x = this.lastPlatform.body.x + this.TILESIZE + salto * this.TILESIZE * 7.5;
                    if (salto == 1){
                        this.plataformas.getAt(i).loadTexture('platforml');
                        var j = i==0 ? this.NUMTILES-1 : i-1;
                        this.plataformas.getAt(j).loadTexture('platformr');
                    } else {
                        this.plataformas.getAt(i).loadTexture('platform');
                    }
                    this.lastPlatform = this.plataformas.getAt(i);
                    break;
                }
            }
        },
        generateCoins: function(){
            if(this.coin.body.x <= -200) {
                this.coin.body.x = 1500;
            }
            if(this.coin.body.y != 300) {
                this.coin.body.y = 300;
                this.coin.body.velocity.y = 0;
            }
        },

        //función para coger monedas
        takeCoins: function(player, coin) {

            this.game.puntuacion += 5;
            this.puntuacion.text = 'Puntuacion: ' + this.game.puntuacion;
            this.coin.body.x = 1500;
            this.coin.body.velocity.x = this.LEVELSPEED;

        },
        gameOver: function() {
            this.game.state.start('gameover');
        }

    };

    return Game;
});
