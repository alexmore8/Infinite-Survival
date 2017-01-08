define(function (require) {

    'use strict';

    var _ = require('underscore');
    var mainConstants = require('helpers/main-constants');
    var Phaser = require('phaser');
    var ButtonGroup = require('sprites/game/button_group');
    var Name = require('sprites/game/leaderboard_name');
    var Arbiter = require ('arbiter');


    function LeaderBoard(game, x , y, type) {
        Phaser.Group.call(this, game);
        game.add.existing(this);
        _.extend(this, mainConstants);
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;

        if (this.type == "distance")
            this.title = this.add(new Phaser.Text(this.game, 0, 0, "LeaderBoard (Distance)", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        if (this.type == "coins")
            this.title = this.add(new Phaser.Text(this.game, 0, 0, "LeaderBoard (Coins)", { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        this.title.x = this.width/2 - this.title.width/2;
        this.scale.setTo(0.8);

        this.buttons = this.add(new ButtonGroup(game, this.width/2, 418, "center", "horizontal"));
        this.buttons.addButton("distance", function () { Arbiter.publish("distanceLeaderboard"); }, null);
        this.buttons.addButton("coin",     function () { Arbiter.publish("coinLeaderboard"); }, null);
    };

    LeaderBoard.prototype = Object.create(Phaser.Group.prototype);
    LeaderBoard.prototype.constructor = LeaderBoard;


    LeaderBoard.prototype.addItem = function (order,name,score) {
        this.add(new Name(this.game, 0, this.getAt(this.length -1).y + this.getAt(this.length-1).height + 5 ,order,name,score));
    };
    LeaderBoard.prototype.setData = function (data) {
        for (var i=0; i< data.length ; i++){
            var height = this.getAt(this.length -1).y + this.getAt(this.length-1).height + 5;
            if (i==0) height = 69;

            this.add(new Name(this.game, 0, height ,i+1, data[i]['user'],data[i]['score']));
        }

    };



    return LeaderBoard;
});
