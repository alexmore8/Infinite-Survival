define(function(require, exports, module) {

    'use strict';

    var Boot = function Boot(){};

    Boot.prototype = {
        preload: function () {
            //assets we'll use in the loading screen
            this.load.image('progress', 'src/assets/menu/progress.png');
        },
        create: function () {
            //loading screen will have a white background
            this.game.stage.backgroundColor = '#000000';

            //scaling options
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            //have the game centered horizontally
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            //physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.state.start('load');
        }
    };

    return Boot;
});
