define(function(require, exports, module) {

    'use strict';

    function GameOver() {
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    }

    GameOver.prototype = {

        create: function () {
            this.background = this.game.add.image(0,0,'bg_menu');
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'Game Over',{ font: '100px VT323',  fill: '#000000' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            this.buttonstart = this.game.add.button(this.game.world.centerX - 100,500, 'button',this.changebutton,this);
            this.buttonstart.scale.setTo(0.5, 0.5);


            this.startLabel = this.game.add.text(this.game.world.centerX-10, 540, 'Restart',{ font: '50px VT323',  fill: '#000000' });
            this.startLabel.anchor.setTo(0.5, 0.5);
        },
        changebutton: function(){
            this.game.state.start('game');
        }
    };

    return GameOver;
});
