var infinitesurvival = infinitesurvival || {};

infinitesurvival.Boot = function(){};

infinitesurvival.Boot.prototype = {
    preload: function() {
        // Load the image
        infinitesurvival.game.load.image('progressBar', 'assets/menu/progress.png');
    },
    create: function() {
        //Pintamos el fondo
        infinitesurvival.game.stage.backgroundColor = '#aaaaaa';
        infinitesurvival.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        infinitesurvival.game.physics.startSystem(Phaser.Physics.ARCADE);
        infinitesurvival.game.state.start('Load');
    },
    update: function() {
    },
    render: function(){
    }
};
