
var infinitesurvival = infinitesurvival || {};

infinitesurvival.Load = function(){};

infinitesurvival.Load.prototype = {

    preload: function() {

        // Add a 'loading...' label on the screen
        var loadingLabel = infinitesurvival.game.add.text(infinitesurvival.game.world.centerX, 150, 'loading...',{ font: '30px VT323',  fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Display the progress bar
        var progressBar = infinitesurvival.game.add.sprite(infinitesurvival.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        infinitesurvival.game.load.setPreloadSprite(progressBar);

        // Load a new asset that we will use in the menu state
        infinitesurvival.game.load.image('background', 'assets/tiles/background.png');
        infinitesurvival.game.load.image('bg_menu', 'assets/tiles/bg_menu.png');
        infinitesurvival.game.load.image('button', 'assets/menu/button.png');


        infinitesurvival.game.load.spritesheet('boy_dead', 'assets/players/adventureboy/dead.png', 588, 600);
        infinitesurvival.game.load.spritesheet('boy_idle', 'assets/players/adventureboy/idle.png', 319, 486);
        infinitesurvival.game.load.spritesheet('player', 'assets/players/adventureboy/jump.png', 407, 536);
        infinitesurvival.game.load.spritesheet('boy_run', 'assets/players/adventureboy/run.png', 415, 507);
        infinitesurvival.game.load.spritesheet('boy_slide', 'assets/players/adventureboy/slide.png', 394,389);


        //TODO
        infinitesurvival.game.load.image('floor', 'assets/tiles/2.png');
        infinitesurvival.game.load.image('floorr', 'assets/tiles/3.png');
        infinitesurvival.game.load.image('floorl', 'assets/tiles/1.png');
    },
    create: function() {

        infinitesurvival.game.state.start('Menu');
    }
};