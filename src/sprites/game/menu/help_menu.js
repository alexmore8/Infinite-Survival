define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Arbiter = require('arbiter');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');
    var ButtonGroup = require('buttongroup');
    var ProgressGroup = require('progressgroup');


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

        this.buttons = this.add(new ButtonGroup(game, (this.width/2), this.height-130, "center", "horizontal"));
        this.buttons.addButton("leftarrow", function () {
            this.previousScreen();
        }, this);
        this.buttons.addButton("close", function () {
            Arbiter.publish('closemenu');
        }, this);
        this.buttons.addButton("rightarrow", function () {
            this.nextScreen();
        }, this);

        this.actualscreen = 1;
        this.screenssize = 4;

        this.loadedScreen = this.loadScreen(this.actualscreen);
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
            case 3:
                return this.thirdScreen();
            case 4:
                return this.fourthScreen();
        }
    };




    HelpMenu.prototype.firstScreen = function () {
        this.firstScreenItems = this.add(new Phaser.Group(this.game));
        this.firstScreenItems.x = this.xcontent;
        this.firstScreenItems.y = this.ycontent;
        this.firstScreenItems.add(new Phaser.Image(this.game, 0, 0, 'help_text'));
        this.buttons = this.firstScreenItems.add(new ButtonGroup(this.game, 0, this.firstScreenItems.height+20, "left", "vertical"));
        this.buttons.addButton("uparrow");
        this.buttons.addButton("downarrow");

        this.firstScreenItems.add(new Phaser.Text(this.game, this.buttons.x + 100, this.buttons.y + this.buttons.getAt(0).y, "Saltar", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.firstScreenItems.add(new Phaser.Text(this.game, this.buttons.x + 100, this.buttons.y + this.buttons.getAt(1).y, "Agacharse", { font: '50px IMFellEnglishSC',  fill: '#000000' }));

        return this.firstScreenItems;
    };



    HelpMenu.prototype.secondScreen = function () {
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



    HelpMenu.prototype.thirdScreen = function () {

        this.thirdScreenItems = this.add(new Phaser.Group(this.game));
        this.thirdScreenItems.x = this.xcontent;
        this.thirdScreenItems.y = this.ycontent;
        this.thirdScreenItems.add(new Phaser.Image(this.game, 0, 0, 'help_text2'));
        this.buttons = this.thirdScreenItems.add(new ButtonGroup(this.game, 400, this.thirdScreenItems.height-50, "left", "vertical"));
        this.buttons.addButton("p");

        this.progress = this.thirdScreenItems.add(new ProgressGroup(this.game, 0,this.thirdScreenItems.height+20,  'left', 'vertical'));
        this.progress.addProgressStatus("power", 75);
        this.progress.addProgressStatus("power", 100);
        this.textos = this.thirdScreenItems.add(new Phaser.Group(this.game));
        this.textos.x = this.progress.x + this.progress.width + 10;
        this.textos.y = this.progress.y + 8;
        var texto = this.textos.add(new Phaser.Text(this.game, 0, 0, "Toca esperar", { font: '40px IMFellEnglishSC',  fill: '#000000' }));
        texto = this.textos.add(new Phaser.Text(this.game, 0, texto.y + texto.height + 18, "¡¡¡Powerup time!!!", { font: '40px IMFellEnglishSC',  fill: '#000000' }));

        return this.thirdScreenItems;
    };



    HelpMenu.prototype.fourthScreen = function () {

        this.thirdScreenItems = this.add(new Phaser.Group(this.game));
        this.thirdScreenItems.add(new Phaser.Text(this.game, this.xcontent, this.ycontent, "Intenta evitar a todos estos...", { font: '40px IMFellEnglishSC',  fill: '#000000' }));

        this.enemies = this.thirdScreenItems.add(new Phaser.Group(this.game));
        this.bomba =       this.enemies.add(new Phaser.Image(this.game, 0,0, 'bomba'));
        this.calavera =    this.enemies.add(new Phaser.Image(this.game, 150,0,'calavera'));
        this.nitro =       this.enemies.add(new Phaser.Image(this.game, 300,0,'nitro'));
        this.pinchos =     this.enemies.add(new Phaser.Image(this.game, 450,0,'pinchos'));
        this.enemies.x = this.width/2 - this.enemies.width/2;
        this.enemies.y = this.ycontent+70;


        this.enemies2 = this.thirdScreenItems.add(new Phaser.Group(this.game));
        this.skeleton =    this.enemies2.add(new Phaser.Image(this.game,0,0,'skeleton'));
        this.stone =       this.enemies2.add(new Phaser.Image(this.game,190,0,'stone'));
        this.tnt =         this.enemies2.add(new Phaser.Image(this.game,370,0,'tnt'));
        this.enemies2.x = this.width/2 - this.enemies2.width/2 -30;
        this.enemies2.y = this.enemies.y + this.enemies.height +50;
        return this.thirdScreenItems;
    };


    return HelpMenu;
});
