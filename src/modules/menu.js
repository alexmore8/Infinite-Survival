define(function(require, exports, module) {

    'use strict';

    var ButtonGroup = require('sprites/game/button_group');

    function Menu() {
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    }

    Menu.prototype = {
        create: function () {
            this.background = this.game.add.image(0,0,'bg_menu');
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'Infinite Survival',{ font: '100px IMFellEnglishSC',  fill: '#000000' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            this.buttonstart = this.game.add.button(this.game.world.centerX - 100,500, 'button',this.changebutton,this);
            this.buttonstart.scale.setTo(0.5, 0.5);


            this.startLabel = this.game.add.text(this.game.world.centerX-10, 540, 'Start',{ font: '50px IMFellEnglishSC',  fill: '#000000' });
            this.startLabel.anchor.setTo(0.5, 0.5);
        },
        changebutton: function(){
            this.game.state.start('game');
        }
    };

    return Menu;
});
