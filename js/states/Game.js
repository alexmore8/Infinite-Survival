var infinitesurvival = infinitesurvival || {};

infinitesurvival.Game = function(){};

infinitesurvival.Game.prototype = {

    preload: function() {
        background = infinitesurvival.game.add.image(0,0,'background');
        background2 = infinitesurvival.game.add.image(1023,0,'background');


        this.sprite = infinitesurvival.game.add.sprite(infinitesurvival.game.world.centerX-80,400,'boy_run');
        this.sprite.scale.setTo(0.4);
        this.sprite.animations.add('walk');
        this.sprite.animations.play('walk' ,20, true);
    },
    create: function() {
    },
    update: function() {
    },
    render: function(){
    }
};
