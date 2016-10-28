var infinitesurvival = infinitesurvival || {};

infinitesurvival.Boot = function(){};

infinitesurvival.Boot.prototype = {
  preload: function() {
        infinitesurvival.game.load.spritesheet('player', 'assets/players/adventure_girl/run.png', 24, true);
    },
  create: function() {
        infinitesurvival.game.state.start('Game');
  },
  update: function() {
  },
  render: function(){
    }
};
