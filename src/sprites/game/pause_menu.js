define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var ButtonGroup = require('sprites/game/button_group');
    var ProgressData = require('sprites/game/progress_data');
    var ProgressGroup = require('sprites/game/progress_group');


    function PauseMenu(game, playeritems, callback) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);

        this.game = game;


        this.add(new Phaser.Sprite(game, 0, 0, "menu_vertical"));
        this.getAt(this.length -1).scale.setTo(0.8);
        this.x = this.game.world.centerX - (this.getAt(this.length -1).width/2);
        this.y = this.game.world.centerY - (this.getAt(this.length -1).height/2);

        this.add(new Phaser.Text(game, 195, 6, "Menu", { font: '50px IMFellEnglishSC',  fill: '#000000' }));

        this.buttons = this.add(new ButtonGroup(game, (this.width/2), 120, "center", "horizontal"));
        this.buttons.addButtton("play", callback, playeritems);
        this.buttons.addButtton("reboot", function () { game.state.start('game') } , this);
        this.buttons.addButtton("home", function () { game.state.start('menu') } , this);

        this.powers = this.add(new ProgressGroup(this.game, (this.width/2), 195, "center", "vertical"));
        this.life = this.powers.addProgressStatus("life", playeritems.player.health);
        this.power = this.powers.addProgressStatus("power", playeritems.player.power);


        this.coins = this.add(new ProgressData(game, 130, 330, "coins", playeritems.coins.numero()));
        this.distance = this.add(new ProgressData(game, 380, 388, "distance", playeritems.distance.numero(), true));


        this.buttons = this.add(new ButtonGroup(game, (this.width/2), 450, "center", "horizontal"));
        this.buttons.addButtton("facebook", function () {
            var win = window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }, this);

        this.buttons.addButtton("twitter", function () {
            var win = window.open("https://twitter.com/home?status=Acabo%20de%20probar%20Infinite%20Survival,%20%C2%BFpuedes%20superarme?%20https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        } , this);
        this.buttons.addButtton("google", function () {
            var win = window.open("https://plus.google.com/share?url=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }, this);



    };

    PauseMenu.prototype = Object.create(Phaser.Group.prototype);
    PauseMenu.prototype.constructor = PauseMenu;


    return PauseMenu;
});
