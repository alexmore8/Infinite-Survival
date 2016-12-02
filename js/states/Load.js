
var insur = insur || {};

insur.Load = function(){};

insur.Load.prototype = {

    preload: function() {

        // Add a 'loading...' label on the screen
        var loadingLabel = insur.game.add.text(insur.game.world.centerX, 150, 'loading...',{ font: '30px VT323',  fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Display the progress bar
        var progressBar = insur.game.add.sprite(insur.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        insur.game.load.setPreloadSprite(progressBar);

        // Load a new asset that we will use in the menu state
        insur.game.load.image('background', 'assets/tiles/background.png');
        insur.game.load.image('bg_menu', 'assets/tiles/bg_menu.png');
        insur.game.load.image('button', 'assets/menu/button.png');
        insur.game.load.image('coin', 'assets/coin.png');
 
	insur.game.load.spritesheet('coins', 'assets/monedas.png', 64, 64, 12);
        insur.game.load.spritesheet('boy_dead', 'assets/players/adventureboy/dead.png', 588, 600);
        insur.game.load.spritesheet('boy_idle', 'assets/players/adventureboy/idle.png', 319, 486);
        insur.game.load.spritesheet('player', 'assets/players/adventureboy/jump.png', 407, 536);
        insur.game.load.spritesheet('boy_run', 'assets/players/adventureboy/run.png', 415, 507);
        insur.game.load.spritesheet('boy_slide', 'assets/players/adventureboy/slide.png', 394,389);


        //TODO
        insur.game.load.image('floor', 'assets/tiles/2.png');
        insur.game.load.image('floorr', 'assets/tiles/3.png');
        insur.game.load.image('floorl', 'assets/tiles/1.png');
    },
    create: function() {

        insur.game.state.start('Game');
    }
};
