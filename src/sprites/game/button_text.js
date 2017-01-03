define(function (require) {

    'use strict';

    var Phaser = require('phaser');
    var Button = require('sprites/game/button');

    function ButtonText(game, x, y, callback, context, text) {
        Phaser.Group.call(this, game);
        game.add.existing(this);



        this.add(new Phaser.Text(game, 0, 0, text, { font: '50px IMFellEnglishSC',  fill: '#000000' }));
        if (this.getAt(0).width < 120){
            this.add(new Button(game,0,0,"corto", callback,context));
        } else if (this.getAt(0).width < 175){
            this.add(new Button(game,0,0,"normal", callback,context));
        } else {
            this.add(new Button(game,0,0,"largo", callback,context));
        }

        console.log(this.getAt(0).width);

        var xtext = (this.getAt(1).width/2) - (this.getAt(0).width/2);
        var ytext = (this.getAt(1).height/2) - (this.getAt(0).height/2);
        this.add(new Phaser.Text(game, xtext, ytext, text, { font: '50px IMFellEnglishSC',  fill: '#000000' }));

    };

    ButtonText.prototype = Object.create(Phaser.Group.prototype);
    ButtonText.prototype.constructor = ButtonText;

    return ButtonText;
});
