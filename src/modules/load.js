define(function(require, exports, module) {

    'use strict';

    function Load() {
        this.loadingLabel = null;
        this.progressBar = null;
        this.ready = false;
    }

    Load.prototype = {

        preload: function () {

            // Add a 'loading...' label on the screen
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'loading...',{ font: '30px VT323',  fill: '#ffffff' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            // Display the progress bar
            this.progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
            this.progressBar.anchor.setTo(0.5, 0.5);
            this.game.load.setPreloadSprite(this.progressBar);

            // Load a new asset that we will use in the menu state
            this.game.load.image('background', 'src/assets/tiles/background.png');
            this.game.load.image('bg_menu', 'src/assets/tiles/bg_menu.png');
            this.game.load.image('button', 'src/assets/menu/button.png');
     
            this.game.load.spritesheet('coins', 'src/assets/monedas.png', 64, 64, 12);
            this.game.load.spritesheet('boy_dead', 'src/assets/players/adventureboy/dead.png', 588, 600);
            this.game.load.spritesheet('boy_idle', 'src/assets/players/adventureboy/idle.png', 319, 486);
            this.game.load.spritesheet('boy_jump', 'src/assets/players/adventureboy/jump.png', 407, 536);
            this.game.load.spritesheet('player', 'src/assets/players/adventureboy/run.png', 415, 507);
            this.game.load.spritesheet('boy_slide', 'src/assets/players/adventureboy/slide.png', 394,389);


            //TODO
            this.game.load.image('floor', 'src/assets/tiles/2.png');
            this.game.load.image('floorr', 'src/assets/tiles/3.png');
            this.game.load.image('floorl', 'src/assets/tiles/1.png');

            this.game.load.image('platform', 'src/assets/tiles/15.png');
            this.game.load.image('platformr', 'src/assets/tiles/16.png');
            this.game.load.image('platforml', 'src/assets/tiles/14.png');
        },

        create: function () {
            this.game.state.start('menu');
        }
    };

    return Load;
});
