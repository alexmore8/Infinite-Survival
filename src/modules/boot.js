define(function(require, exports, module) {

    'use strict';

    var Phaser = require('phaser');

    var Boot = function Boot(){
        Phaser.State.call(this);
    };

    Boot.prototype = Object.create(Phaser.State.prototype);
    Boot.prototype.constructor = Boot;

    Boot.prototype = {
        preload: function () {
            this.game.load.image('game_progress', 'src/assets/menu/progress/game_progress.png');
        },
        create: function () {
            this.game.stage.backgroundColor = '#000000';

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            this.game.add.text(-1000, -1000, 'cargando...',{ font: '30px Sacramento',  fill: '#000000' });
            this.game.add.text(-1000, -1000, 'cargando...',{ font: '30px Satisfy',  fill: '#000000' });
            this.game.add.text(-1000, -1000, 'cargando...',{ font: '30px VT323',  fill: '#000000' });
            this.game.add.text(-1000, -1000, 'cargando...',{ font: '30px Pacifico',  fill: '#000000' });
            this.game.add.text(-1000, -1000, 'cargando...',{ font: '30px IMFellEnglishSC',  fill: '#000000' });


            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.state.start('load');
        }
    };

    return Boot;
});
