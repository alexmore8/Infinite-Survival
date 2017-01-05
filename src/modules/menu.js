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


            this.buttons = new ButtonGroup(this.game ,this.game.world.width - 10, 10, "right", "horizontal");
            var effectsbutton = this.buttons.addButtton("sound", function () {
                if (this.game.effectsvolume == 0){
                    this.game.effectsvolume = this.game.EFFECTVOLUME;
                    this.basicbuttons();
                } else {
                    this.game.effectsvolume = 0;
                    this.extrabuttons();
                }
            }, null);
            if (this.game.effectsvolume == 0){
                effectsbutton.extrabuttons();
            }
            var soundbutton = this.buttons.addButtton("music", function () {
                if (this.game.musicvolume == 0){
                    this.game.musicvolume = this.game.MUSICVOLUME;
                    this.game.music.volume = this.game.musicvolume;
                    this.basicbuttons();
                } else {
                    this.game.musicvolume = 0;
                    this.game.music.volume = 0;
                    this.extrabuttons();
                }
            }, null);
            if (this.game.musicvolume == 0){
                soundbutton.extrabuttons();
            }
            this.buttons.addButtton("help", this.helpmenu, this);

            Arbiter.subscribe('closehelpmenu', this.closehelpmenu, null, this);

            if (this.game.music == undefined) {
                this.game.music = this.game.add.audio('music_game');
                this.game.music.play("",0,0.2,true);
            }
            if ((localStorage.getItem('firstuse') == null) || (localStorage.getItem('firstuse') == "true")){
                this.menu = new HelpMenu(this.game);
                localStorage.setItem("firstuse", false)
            }
        },
        changebutton: function(){
            this.game.state.start('game');
        },
        helpmenu: function(){
            this.menu = new HelpMenu(this.game);
        },
        closehelpmenu: function () {
            this.menu.destroy();
        }
    };

    return Menu;
});
