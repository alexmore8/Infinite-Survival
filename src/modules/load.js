define(function(require, exports, module) {

    'use strict';

    var Phaser = require('phaser');
    var Firebase = require('firebase');
    var Arbiter = require ('arbiter');

    function Load() {
        Phaser.State.call(this);
        this.loadingLabel = null;
        this.progressBar = null;
    }

    Load.prototype = Object.create(Phaser.State.prototype);
    Load.prototype.constructor = Load;

    Load.prototype = {

        preload: function() {
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'cargando...',{ font: '30px VT323',  fill: '#ffffff' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            this.progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'game_progress');
            this.progressBar.anchor.setTo(0.5, 0.5);
            this.game.load.setPreloadSprite(this.progressBar);


            Arbiter.subscribe('coinsload', this.bestCoins, null, this);
            Arbiter.subscribe('distanceload', this.bestDistance, null, this);
            (new Firebase(this.game.username)).bestData();

            // Preferencias del juego
            this.game.dificultad = localStorage.getItem("dificultad") == null ? "facil" : localStorage.getItem("dificultad");
            this.game.effectsvolume = localStorage.getItem("effectsvolume") == null ? this.EFFECTVOLUME : 0;
            this.game.musicvolume =   localStorage.getItem("musicvolume") == null ? this.MUSICVOLUME : 0;



            // Game sounds
            this.game.load.audio('sound_coin',        'src/assets/sounds/8bit/344520__jeremysykes__coin05.wav');
            this.game.load.audio('sound_player_jump', 'src/assets/sounds/8bit/344501__jeremysykes__jump04.wav');
            this.game.load.audio('sound_player_dead', 'src/assets/sounds/8bit/341239__jeremysykes__explosion00.wav');
            this.game.load.audio('sound_explosion',   'src/assets/sounds/bangsandexplosions/268550__cydon__bang-004.mp3');
            this.music = this.game.load.audio('music_game',        'src/assets/sounds/Kevin_MacLeod_-_Call_to_Adventure.mp3');



            // Cargando los fondos de pantalla
            var fondos =   ["game",
                            "menu",
                            "scores",
                            "settings"];
            for (var i = 0 ; i < fondos.length ; i++)
                this.game.load.image('bg_'+fondos[i], 'src/assets/backgrounds/bg_'+fondos[i]+'.png');


            // Menu images
            this.game.load.image('menu_horizontal',          'src/assets/menu/menu_horizontal.png');
            this.game.load.image('menu_vertical',            'src/assets/menu/menu_vertical.png');
            this.game.load.image('black_background',         'src/assets/menu/black_background.png');
            this.game.load.image('help_text',                'src/assets/menu/help/help_text.png');
            this.game.load.image('help_text2',               'src/assets/menu/help/help_text2.png');


            // LeaderBoard
            this.game.load.image('leaderboard_name',          'src/assets/menu/scoreboard/names.png');


            //botones
            this.game.load.spritesheet('btn_corto', 'src/assets/menu/buttons/btn_corto.png', 363,178);
            this.game.load.spritesheet('btn_normal', 'src/assets/menu/buttons/btn_normal.png', 503, 178);
            this.game.load.spritesheet('btn_largo', 'src/assets/menu/buttons/btn_largo.png', 691, 178);


            var botones =
                ["coin",
                "close",
                "distance",
                "downarrow",
                "facebook",
                "google",
                "help",
                "home",
                "leftarrow",
                "music",
                "p",
                "pause",
                "play",
                "reboot",
                "rightarrow",
                "settings",
                "sound",
                "twitter",
                "uparrow"];
            for (var i = 0 ; i < botones.length ; i++)
                this.game.load.spritesheet('btn_'+botones[i], 'src/assets/menu/buttons/btn_'+botones[i]+'.png', 176, 176);


            // Barras de estado para los progresos del juego
            this.game.load.image('life',               'src/assets/menu/progress/life.png');
            this.game.load.image('lifeprogress',       'src/assets/menu/progress/life_progress.png');
            this.game.load.image('power',              'src/assets/menu/progress/power.png');
            this.game.load.image('powerprogress',      'src/assets/menu/progress/power_progress.png');
            this.game.load.image('shield',             'src/assets/menu/progress/shield.png');
            this.game.load.image('shieldprogress',     'src/assets/menu/progress/shield_progress.png');
            this.game.load.image('coins',              'src/assets/menu/progress/coins.png');
            this.game.load.image('gems',               'src/assets/menu/progress/gems.png');
            this.game.load.image('distance',           'src/assets/menu/progress/distance.png');

            // Monedas y gemas del juego
            this.game.load.spritesheet('coin_gold', 'src/assets/coins/coin_gold.png', 85.71, 86, 14);
            this.game.load.spritesheet('coin_silver', 'src/assets/coins/coin_silver.png', 85.71, 86, 14);
            this.game.load.spritesheet('coin_bronze', 'src/assets/coins/coin_bronze.png', 85.71, 86, 14);

            // Sprites de los jugadores
            this.game.load.spritesheet('boy_dead', 'src/assets/players/adventureboy/dead.png', 235, 214);
            this.game.load.spritesheet('boy_jump', 'src/assets/players/adventureboy/jump.png', 162, 214);
            this.game.load.spritesheet('boy_run', 'src/assets/players/adventureboy/run.png', 165, 214);
            this.game.load.spritesheet('boy_slide', 'src/assets/players/adventureboy/slide.png', 156,214);
            this.game.load.spritesheet('knight_jump', 'src/assets/players/knight/jumpattack.png', 198, 214);
            this.game.load.spritesheet('knight_run', 'src/assets/players/knight/run.png', 188, 214);

            // Sprites de los enemigos
            this.game.load.image('bomba',     'src/assets/enemies/bomba.png');
            this.game.load.image('calavera',  'src/assets/enemies/calavera.png');
            this.game.load.image('nitro',     'src/assets/enemies/Nitro.png');
            this.game.load.image('pinchos',   'src/assets/enemies/pinchos.png');
            this.game.load.image('skeleton',  'src/assets/enemies/Skeleton.png');
            this.game.load.image('stone',     'src/assets/enemies/Stone.png');
            this.game.load.image('tnt',       'src/assets/enemies/tnt.png');
            this.game.load.spritesheet('explosion', 'src/assets/enemies/explosion.png', 220,247);




            // Sprites de los bloques del juego
            this.game.load.image('floor', 'src/assets/tiles/2.png');
            this.game.load.image('floorr', 'src/assets/tiles/3.png');
            this.game.load.image('floorl', 'src/assets/tiles/1.png');

            this.game.load.image('platform', 'src/assets/tiles/15.png');
            this.game.load.image('platformr', 'src/assets/tiles/16.png');
            this.game.load.image('platforml', 'src/assets/tiles/14.png');
        },
        create: function() {
            this.game.sound.setDecodedCallback(this.music, this.start, this);
        },
        start: function() {
            this.game.state.start('menu');
        },
        bestDistance: function (data) {
            this.game.distanceLeaderboard = data;
            Arbiter.unsubscribe('distanceload');
        },
        bestCoins: function (data) {
            this.game.coinLeaderboard = data;
            Arbiter.unsubscribe('coinsload');
        }
    };

    return Load;
});
