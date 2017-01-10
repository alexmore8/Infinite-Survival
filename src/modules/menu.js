define(function(require, exports, module) {

    'use strict';

    var HelpMenu = require('help_menu');
    var ButtonGroup = require('buttongroup');
    var Arbiter = require ('arbiter');
    var DifficultyMenu = require('difficultymenu');
    var Phaser = require('phaser');

    function Menu() {
        Phaser.State.call(this);
        this.background = null;
        this.loadingLabel = null;
        this.buttonstart = null;
    }

    Menu.prototype = Object.create(Phaser.State.prototype);
    Menu.prototype.constructor = Menu;

    Menu.prototype = {
        create: function () {
            this.game.add.image(0,0,'bg_menu');

            this.game.add.text(this.game.world.centerX, 150, 'Infinite Survival',{ font: '100px IMFellEnglishSC',  fill: '#000000' }).anchor.setTo(0.5, 0.5);

            this.buttonstart = new ButtonGroup(this.game ,this.game.world.centerX, 500, "center");
            this.buttonstart.addButtonText("Start", this.startgame, this);


            this.buttons = new ButtonGroup(this.game ,this.game.world.width - 10, 10, "right", "horizontal");
            var effectsbutton = this.buttons.addButton("sound", this.changesound, null);
            if (this.game.effectsvolume == 0) effectsbutton.extrabuttons();
            var soundbutton = this.buttons.addButton("music", this.changemusic, null);
            if (this.game.musicvolume == 0)   soundbutton.extrabuttons();
            this.buttons.addButton("settings", this.difficultymenu, this);
            this.buttons.addButton("help", this.helpmenu, this);

            Arbiter.subscribe('closemenu', this.closemenu, null, this);

            if (this.game.music == undefined) {
                this.game.music = this.game.add.audio('music_game');
                this.game.music.play("",0,this.game.musicvolume,true);
            }
            if ((localStorage.getItem('firstuse') == null) || (localStorage.getItem('firstuse') == "true")){
                this.helpmenu();
                localStorage.setItem("firstuse", false);
            }
        },
        startgame: function(){
            Arbiter.unsubscribe('');
            this.game.state.start('game');
        },
        helpmenu: function(){
            this.backgrounblack = this.game.add.image(0, 0, "black_background");
            this.backgrounblack.alpha = 0.6;
            this.menu = new HelpMenu(this.game);
        },
        difficultymenu: function(){
            this.backgrounblack = this.game.add.image(0, 0, "black_background");
            this.backgrounblack.alpha = 0.6;
            this.menu = new DifficultyMenu(this.game);
        },
        closemenu: function () {
            this.menu.destroy();
            this.backgrounblack.destroy();
        },
        changesound: function () {
            if (this.game.effectsvolume == 0){
                this.game.effectsvolume = this.game.EFFECTVOLUME;
                localStorage.removeItem("effectsvolume");
                this.basicbuttons();
            } else {
                this.game.effectsvolume = 0;
                localStorage.setItem("effectsvolume", false);
                this.extrabuttons();
            }
        },
        changemusic: function () {
            if (this.game.musicvolume == 0){
                this.game.musicvolume = this.game.MUSICVOLUME;
                this.game.music.volume = this.game.musicvolume;
                localStorage.removeItem("musicvolume");
                this.basicbuttons();
            } else {
                this.game.musicvolume = 0;
                this.game.music.volume = 0;
                localStorage.setItem("musicvolume", false);
                this.extrabuttons();
            }
        }
    };

    return Menu;
});
