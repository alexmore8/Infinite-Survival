define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Arbiter = require('arbiter');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var ButtonGroup = require('sprites/game/button_group');
    var ProgressGroup = require('sprites/game/progress_group');


    function HelpMenu(game, onclose, context) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.game = game;


        this.add(new Phaser.Sprite(game, 0, 0, "menu_horizontal"));
        this.getAt(this.length -1).scale.setTo(0.8);
        this.x = this.game.world.centerX - (this.getAt(this.length -1).width/2);
        this.y = this.game.world.centerY - (this.getAt(this.length -1).height/2);

        this.add(new Phaser.Text(game, 195, 15, "Ayuda", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.getAt(this.length-1).x = (this.width/2) - (this.getAt(this.length-1).width/2);

        this.xcontent = 100;
        this.ycontent = 140;
        this.loadedScreen = this.firstScreen();

        this.buttons = this.add(new ButtonGroup(game, (this.width/2), this.height-130, "center", "horizontal"));
        this.buttons.addButtton("leftarrow", function () {
            this.nextScreen();
        }, this);
        this.buttons.addButtton("close", function () {
            Arbiter.publish('closehelpmenu');
        }, this);
        this.buttons.addButtton("rightarrow", function () {
            this.previousScreen();
        }, this);

        this.actualscreen = 1;
        this.screenssize = 2;

    };

    HelpMenu.prototype = Object.create(Phaser.Group.prototype);
    HelpMenu.prototype.constructor = HelpMenu;

    HelpMenu.prototype.nextScreen = function () {
        this.loadedScreen.destroy();
        this.actualscreen = this.actualscreen == this.screenssize ? 1 : this.actualscreen + 1;
        this.loadedScreen = this.loadScreen(this.actualscreen);
    };

    HelpMenu.prototype.previousScreen = function () {
        this.loadedScreen.destroy();
        this.actualscreen = this.actualscreen == 1 ? this.screenssize : this.actualscreen -1;
        this.loadedScreen = this.loadScreen(this.actualscreen);
    };

    HelpMenu.prototype.loadScreen= function (screen) {
        switch (screen){
            case 1:
                return this.firstScreen();
            case 2:
                return this.secondScreen();
        }
    };




    HelpMenu.prototype.firstScreen = function () {
        this.firstScreenItems = this.add(new Phaser.Group(this.game));
        this.firstScreenItems.x = this.xcontent;
        this.firstScreenItems.y = this.ycontent;
        this.firstScreenItems.add(new Phaser.Image(this.game, 0, 0, 'help_text'));
        this.buttons = this.firstScreenItems.add(new ButtonGroup(this.game, 0, this.firstScreenItems.height+20, "left", "vertical"));
        this.buttons.addButtton("uparrow");
        this.buttons.addButtton("downarrow");

        this.firstScreenItems.add(new Phaser.Text(this.game, this.buttons.x + 100, this.buttons.y + this.buttons.getAt(0).y, "Saltar", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.firstScreenItems.add(new Phaser.Text(this.game, this.buttons.x + 100, this.buttons.y + this.buttons.getAt(1).y, "Agacharse", { font: '50px IMFellEnglishSC',  fill: '#000000' }));

        return this.firstScreenItems;
    };



    HelpMenu.prototype.secondScreen = function (g) {
        this.secondScreenItems = this.add(new Phaser.Group(this.game));
        this.secondScreenItems.x = this.xcontent;
        this.secondScreenItems.y = this.ycontent;
        this.progress = this.secondScreenItems.add(new ProgressGroup(this.game, 0, 0, 'left', 'vertical'));
        this.progress.addProgressStatus("life", 75);
        this.progress.addProgressStatus("power", 45);
        this.progress.addProgressData("coins", 10);
        this.progress.addProgressData("distance", 173);
        this.textos = this.secondScreenItems.add(new Phaser.Group(this.game));
        this.textos.x = this.progress.x + this.progress.width + 10;
        this.textos.y = this.progress.y + 8;
        var texto = this.textos.add(new Phaser.Text(this.game, 0, 0, "Vida del personaje", { font: '40px IMFellEnglishSC',  fill: '#000000' }));
        texto = this.textos.add(new Phaser.Text(this.game, 0, texto.y + texto.height + 18, "Carga hasta powerup", { font: '40px IMFellEnglishSC',  fill: '#000000' }));
        texto = this.textos.add(new Phaser.Text(this.game, 0, texto.y + texto.height + 18, "Monedas recogidas", { font: '40px IMFellEnglishSC',  fill: '#000000' }));
        texto = this.textos.add(new Phaser.Text(this.game, 0, texto.y + texto.height + 18, "Distancia recorrida", { font: '40px IMFellEnglishSC',  fill: '#000000' }));

        return this.secondScreenItems;

    };


    return HelpMenu;
});
