var insur = insur || {};

insur.Boot = function(){};

insur.Boot.prototype = {
    preload: function() {
        // Load the image
        insur.game.load.image('progressBar', 'assets/menu/progress.png');
    },
    create: function() {
        //Pintamos el fondo
        insur.game.stage.backgroundColor = '#aaaaaa';
        insur.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        insur.game.physics.startSystem(Phaser.Physics.ARCADE);
        insur.game.state.start('Load');
    },
    update: function() {
    },
    render: function(){
    }
};
