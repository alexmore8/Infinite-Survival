define(function(require, exports, module) {

    'use strict';


    var ButtonGroup = require('sprites/game/button_group');
    var Phaser = require('phaser');


    function Menu() {
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    }

    Menu.prototype = {
        create: function () {
            this.game.add.image(0,0,'bg_menu');
            this.loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'Infinite Survival',{ font: '100px IMFellEnglishSC',  fill: '#000000' });
            this.loadingLabel.anchor.setTo(0.5, 0.5);

            this.buttonstart = new ButtonGroup(this.game ,this.game.world.centerX, 500, "center");
            this.buttonstart.addButttonText(this.changebutton, this, "Startaa");
        },
        changebutton: function(){
            this.game.state.start('game');
        }
    };

    return Menu;
});
