var infinitesurvival = infinitesurvival || {};

infinitesurvival.Game = function(){};

infinitesurvival.Game.prototype = {
    create: function() {
      infinitesurvival.player = infinitesurvival.game.add.sprite(100,100,'player');
      anim = infinitesurvival.player.animations.add('walk');
      anim.play();
    },
    update: function() {
    }
};
