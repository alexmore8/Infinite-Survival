define(function(require, exports, module) {

    'use strict';

    var Boot = function Boot(){};

    Boot.prototype = {
        preload: function () {
            this.load.image('progress', 'src/assets/menu/progress.png');
        },
        create: function () {
            this.game.stage.backgroundColor = '#000000';

            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.state.start('load');
        }
    };

    return Boot;
});
