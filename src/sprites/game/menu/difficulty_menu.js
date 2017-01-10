define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('mainconstants');
    var Phaser = require('phaser');
    var RRSS = require('rrss');
    var ButtonGroup = require('buttongroup');
    var ProgressData = require('progressdata');
    var ProgressGroup = require('progressgroup');
    var Arbiter = require ('arbiter');


    function DifficultyMenu(game) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.game = game;


        this.add(new Phaser.Sprite(game, 0, 0, "menu_vertical"));
        this.getAt(this.length -1).scale.setTo(0.8);
        this.x = this.game.world.centerX - (this.getAt(this.length -1).width/2);
        this.y = this.game.world.centerY - (this.getAt(this.length -1).height/2);

        this.add(new Phaser.Text(game, 180, 6, "Ajustes", { font: '50px IMFellEnglishSC',  fill: '#000000' }));

        this.add(new Phaser.Text(game, 140, 115, "Dificultad", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.buttons = this.add(new ButtonGroup(game, (this.width/2), 190, "center", "vertical"));
        this.buttons.addButtonText("Facil",     function () {localStorage.setItem("dificultad", "facil"); this.dificultad = "facil";   Arbiter.publish("closemenu"); } , game);
        this.buttons.addButtonText("Medio",     function () {localStorage.setItem("dificultad", "medio"); this.dificultad = "medio";   Arbiter.publish("closemenu"); } , game);
        this.buttons.addButtonText("Dificil",   function () {localStorage.setItem("dificultad", "dificil"); this.dificultad = "dificil"; Arbiter.publish("closemenu"); } , game);

    };

    DifficultyMenu.prototype = Object.create(Phaser.Group.prototype);
    DifficultyMenu.prototype.constructor = DifficultyMenu;


    return DifficultyMenu;
});
