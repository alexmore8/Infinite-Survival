define(function(require, exports, module) {

    'use strict';

    var Boot = function Boot(){};

    Boot.prototype = {

        preload: function() {
            // Load the image
            this.game.load.image('progressBar', 'src/assets/menu/progress.png');
        },

        create: function () {
            this.game.input.maxPointers = 1;
            
            //Pintamos el fondo
            this.game.stage.backgroundColor = '#aaaaaa';
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            } else {
                this.game.scale.minWidth =  480;
                this.game.scale.minHeight = 260;
                this.game.scale.maxWidth = 640;
                this.game.scale.maxHeight = 480;
                this.game.scale.forceLandscape = true;
                this.game.scale.pageAlignHorizontally = true;
                //this.game.scale.setScreenSize(true);
            }


            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('load');
        }

    };

    return Boot;
});
