var infinitesurvival = infinitesurvival || {};

infinitesurvival.Game = function(){};

infinitesurvival.Game.prototype = {

      preload: function() {
      },
      changeMummy: function() {
          this.i++;
          this.sprite.loadTexture('ms'+this.i, 0);
          this.sprite.animations.add('walk');
          this.sprite.animations.play('walk', 15, true);
      },
      create: function() {
        this.i = 0;
        this.sprite = infinitesurvival.game.add.sprite(40, 100, 'ms1');
    		this.sprite.scale.setTo(1);
        this.sprite.animations.add('walk');
        this.sprite.animations.play('walk', 20, true);
        infinitesurvival.game.input.onDown.addOnce(this.changeMummy, this);      },
      update: function() {
        infinitesurvival.game.input.onDown.addOnce(this.changeMummy, this);
      },
      render: function(){
      }
  };
