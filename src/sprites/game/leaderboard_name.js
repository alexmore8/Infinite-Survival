define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');


    function LeaderBoardName(game, x , y, order, name, score) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);
        this.game = game;
        this.x = x;
        this.y = y;

        this.background = this.add(new Phaser.Image(game, 0, 0, "leaderboard_name"));
        this.order = this.add(new Phaser.Text(this.game, 20, 0, order, { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.name = this.add(new Phaser.Text(this.game, 70, 0, name, { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.score = this.add(new Phaser.Text(this.game, 380, 0, score, { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.order.y = this.background.height/2 - this.order.height/2 -5;
        this.name.y = this.background.height/2 - this.name.height/2 -5;
        this.score.y = this.background.height/2 - this.score.height/2 -5;
    };

    LeaderBoardName.prototype = Object.create(Phaser.Group.prototype);
    LeaderBoardName.prototype.constructor = LeaderBoardName;

    return LeaderBoardName;
});
