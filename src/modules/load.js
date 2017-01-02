define(function(require, exports, module) {

    'use strict';

    function Load() {
        this.loadingLabel = null;
        this.progressBar = null;
        this.ready = false;
    }

    Load.prototype = {

        preload: function() {
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'cargando...',{ font: '30px VT323',  fill: '#ffffff' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            this.progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'game_progress');
            this.progressBar.anchor.setTo(0.5, 0.5);
            this.game.load.setPreloadSprite(this.progressBar);

            // Cargando los fondos de pantalla
            this.game.load.image('bg_game', 'src/assets/backgrounds/bg_game.png');
            this.game.load.image('bg_menu', 'src/assets/backgrounds/bg_menu.png');


            //botones
            this.game.load.spritesheet('btn_corto', 'src/assets/menu/buttons/btn_corto.png', 363,178);
            this.game.load.spritesheet('btn_normal', 'src/assets/menu/buttons/btn_normal.png', 503, 178);
            this.game.load.spritesheet('btn_largo', 'src/assets/menu/buttons/btn_largo.png', 691, 178);
            this.game.load.spritesheet('btn_pause', 'src/assets/menu/buttons/btn_pause.png', 176, 176);
            this.game.load.spritesheet('btn_settings', 'src/assets/menu/buttons/btn_settings.png', 176, 176);
            this.game.load.spritesheet('btn_music', 'src/assets/menu/buttons/btn_music.png', 176, 176);
            this.game.load.spritesheet('btn_nomusic', 'src/assets/menu/buttons/btn_nomusic.png', 176, 176);
            this.game.load.spritesheet('btn_sound', 'src/assets/menu/buttons/btn_sound.png', 176, 176);
            this.game.load.spritesheet('btn_nosound', 'src/assets/menu/buttons/btn_nosound.png', 176, 176);

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


            // Sprites de los bloques del juego
            this.game.load.image('floor', 'src/assets/tiles/2.png');
            this.game.load.image('floorr', 'src/assets/tiles/3.png');
            this.game.load.image('floorl', 'src/assets/tiles/1.png');

            this.game.load.image('platform', 'src/assets/tiles/15.png');
            this.game.load.image('platformr', 'src/assets/tiles/16.png');
            this.game.load.image('platforml', 'src/assets/tiles/14.png');
        },
        create: function() {
            this.state.start('menu');
        }
    };

    return Load;
});
