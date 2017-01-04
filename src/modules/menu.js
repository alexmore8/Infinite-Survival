define(function(require, exports, module) {

    'use strict';


    var HelpMenu = require('sprites/game/help_menu');
    var ButtonGroup = require('sprites/game/button_group');
    var Phaser = require('phaser');
    var Arbiter = require ('arbiter');

    function Menu() {
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
        this.startLabel = null;
    }

    Menu.prototype = {
        create: function () {
            this.game.add.image(0,0,'bg_menu');

            this.game.add.text(this.game.world.centerX, 150, 'Infinite Survival',{ font: '100px IMFellEnglishSC',  fill: '#000000' }).anchor.setTo(0.5, 0.5);

            this.buttonstart = new ButtonGroup(this.game ,this.game.world.centerX, 500, "center");
            this.buttonstart.addButttonText("Start", this.changebutton, this);
            this.helpbutton = new ButtonGroup(this.game ,this.game.world.width-10, 10, "right");
            this.helpbutton.addButtton("help", this.helpmenu, this);

            if (this.game.music == undefined) {
                this.game.music = this.game.add.audio('music_game');
                this.game.music.play("",0,0.2,true);
            }
        },
        changebutton: function(){
            this.game.state.start('game');
        },
        helpmenu: function(){
            Arbiter.subscribe('closehelpmenu', this.closehelpmenu, null, this);
            this.menu = new HelpMenu(this.game);
        },
        closehelpmenu: function () {
            this.menu.destroy();
        }
    };

    return Menu;
});
