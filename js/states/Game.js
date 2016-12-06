var insur = insur || {};

insur.Game = function(){};

insur.Game.prototype = {

    preload: function() {
        // Cargamos tres fondos de pantalla para ir moviéndolos y dar una sensación de movimiento
        this.background = insur.game.add.image(0,0,'background');
        this.background2 = insur.game.add.image(1023,0,'background');
        this.background3 = insur.game.add.image(2046,0,'background');

        // Cargamos los sprites de la moneda y del jugador
        this.coin = insur.game.add.sprite(600, 300, 'coins');
        insur.player = insur.game.add.sprite(insur.game.world.width/2-200, insur.game.world.height - insur.Config.tileSize -200, 'player');

        insur.game.time.advancedTiming = true;
    },
    create: function() {

        // Hacemos que pueda chocar y la ponemos con un tamaño adecuado
        insur.game.physics.arcade.enable(this.coin);
        this.coin.scale.setTo(2);
        // Cambiamos las propiedades para colocarla en el punto que queremos y le añadimos velocidad
        this.coin.body.velocity.x = insur.Config.levelSpeed;
        this.coin.body.y = 600;
        // Animamos la moneda
        this.coin.animations.add('girar');
        this.coin.animations.play('girar', 20, true);






        // Creamos una etiquetaa para la puntuación y lo colocamos
        this.puntuacion = insur.game.add.text(30, 30, 'puntuacion: 0',{ font: '50px VT323', fill: '#0000FF' });
        this.puntuacion.fixedToCamera=true;
        insur.game.global.puntuacion = 0;







        // Creamos el muro y vamos colocándolos en la pantalla
        this.suelo = insur.game.add.group();
        this.suelo.enableBody = true;
        for(var i=0; i<insur.Config.numtiles; i++) {
            newItem = this.suelo.create(i * insur.Config.tileSize, insur.game.world.height - insur.Config.tileSize, 'floor');
            newItem.body.immovable = true;
            newItem.body.velocity.x = insur.Config.levelSpeed;
        }
        // Guardamos el último suelo y el último salto
        this.lastFloor = newItem;
        this.lastCliff = false;








        // Creamos la plataforma y vamos colocándolos en la pantalla
        this.plataforma = insur.game.add.group();
        this.plataforma.enableBody = true;
        for(var i=0; i<insur.Config.numtiles; i++) {
            newItem = this.plataforma.create(i * insur.Config.tileSize, insur.game.world.height - insur.Config.tileSize - 300, 'platform');
            newItem.body.immovable = true;
            newItem.body.velocity.x = insur.Config.levelSpeed;
        }
        // Guardamos la última plataforma y el último salto de plataforma
        this.lastPlatform = newItem;
        this.lastCliffplataforma = false;







        // Creamos las colisiones con el player, le ajustamos el tamaño, y le configuramos la física
        insur.game.physics.arcade.enable(insur.player);
        insur.player.scale.setTo(0.4);
        insur.player.body.gravity.y = 2000;
        insur.player.body.velocity.x = -insur.Config.levelSpeed;
        // Animamos el sprite del jugador
        anim = insur.player.animations.add('walk');
        anim.play(10, true);





        // Capturamos las teclas del teclado
        this.cursor = insur.game.input.keyboard.createCursorKeys();
        // Hacemos que la cámara siga al jugador
        insur.game.camera.follow(insur.player);
    },

    update: function() {
        // Si se pulsta la tecla de subir
        if (this.cursor.up.isDown) {
            // Hacemos que el jugador salte
            insur.player.body.y += -1;
            insur.player.body.velocity.y = -400;
            insur.player.body.velocity.x = 0;
        }

        // Activamos las colisiones
        insur.game.physics.arcade.collide(insur.player, this.suelo, this.playerHit, null, this);
        insur.game.physics.arcade.collide(insur.player, this.plataforma, this.playerHit, null, this);
        insur.game.physics.arcade.collide(this.plataforma, this.coin);
        insur.game.physics.arcade.collide(this.suelo, this.coin);
        this.generarSuelo();
        this.generarPlataformas();
        this.generateCoins();
    },
    playerHit: function(player, blockedLayer) {
        //if hits on the right side, die
        if(player.body.touching.right) {
            insur.game.state.start('Game');
        }

        if (! player.body.touching.down){
           insur.player.body.velocity.x = 0;
        } else {
            insur.player.body.velocity.x = -insur.Config.levelSpeed;
        }
    },
    generarSuelo: function(){
        var i, salto = 0;
        for(i = 0; i < insur.Config.numtiles; i++) {
            if(this.suelo.getAt(i).body.x <= -insur.Config.tileSize) {

                if((Math.random() < insur.Config.probCliff) && !this.lastCliff) {
                    salto = 1;
                    this.lastCliff = true;
                }
                else
                    this.lastCliff = false;

                this.suelo.getAt(i).body.x = this.lastFloor.body.x + insur.Config.tileSize + salto * insur.Config.tileSize * 2.5;
                if (salto == 1){
                    this.suelo.getAt(i).loadTexture('floorl');
                    j = i==0 ? insur.Config.numtiles-1 : i-1;
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
        for(i = 0; i < insur.Config.numtiles; i++) {
            if(this.plataforma.getAt(i).body.x <= -insur.Config.tileSize) {

                if((Math.random() < insur.Config.probCliff*2) && !this.lastCliffplataforma) {
                    salto = 1;
                    this.lastCliffplataforma = true;
                }
                else
                    this.lastCliffplataforma = false;

                this.plataforma.getAt(i).body.x = this.lastPlatform.body.x + insur.Config.tileSize + salto * insur.Config.tileSize * 7.5;
                if (salto == 1){
                    this.plataforma.getAt(i).loadTexture('platforml');
                    j = i==0 ? insur.Config.numtiles-1 : i-1;
                    this.plataforma.getAt(j).loadTexture('platformr');
                } else {
                    this.plataforma.getAt(i).loadTexture('platform');
                }
                this.lastPlatform = this.plataforma.getAt(i);
                break;
            }
        }
    },
    generateCoins: function(){
        if(this.coin.body.x <= -200) {
            this.coin.body.x = 1500;
        }
    },

        //función para coger monedas
    takeCoins: function(player, coin) {

        insur.game.global.puntuacion += 5;
        this.puntuacion.text = 'puntuacion: ' + game.global.puntuacion;
        this.coin.reset(game.rnd.integerInRange(40, 590), game.rnd.integerInRange(40, 590));

    },
    gameOver: function() {
        insur.game.state.start('Game');
    },
    render: function(){
    }
};
