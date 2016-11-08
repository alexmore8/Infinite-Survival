var infinitesurvival = infinitesurvival || {};

infinitesurvival.Boot = function(){};

infinitesurvival.Boot.prototype = {
    preload: function() {
      //loading screen will have a white background
      infinitesurvival.game.stage.backgroundColor = '#000';

      //scaling options
      infinitesurvival.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;


      //physics system
      infinitesurvival.game.physics.startSystem(Phaser.Physics.ARCADE);

          //  37x45 is the size of each frame
          //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
          //  blank frames at the end, so we tell the loader how many to load
      		j= 1;
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/dead.png', 605, 604);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/idle.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/jump.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/melee.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/run.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/shoot.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventuregirl/slide.png', 641, 542);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_dead.png', 556, 504);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_fall.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_hurt.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_idle.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_jump.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_run.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_slide.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/cat_walk.png', 542, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_dead.png', 580, 510);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_fall.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_hurt.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_idle.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_jump.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_run.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_slide.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/catndog/dog_walk.png', 547, 481);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/attack.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/dead.png', 944, 751);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/idle.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/jump.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/jumpattack.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/run.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/knight/walk.png', 587, 707);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/dead.png', 986, 796);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/idle.png', 579, 763);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/jump.png', 579, 763);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/run.png', 579, 763);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/slide.png', 519, 562);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/pumpking/walk.png', 579, 763);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/attack.png', 536, 495);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/climb.png', 282, 464);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/dead.png', 482, 498);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/glide.png', 443, 454);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/idle.png', 232, 439);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/jump.png', 362, 483);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/jumpattack.png', 504, 522);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/jumpthrow.png', 360, 431);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/slide.png', 373, 351);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/run.png', 363, 458);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjaboy/throw.png', 377, 451);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/atack.png', 524, 565);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/climb.png', 361, 497);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/dead.png', 578, 599);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/glide.png', 505, 474);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/idle.png', 290, 500);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/jump.png', 399, 543);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/jumpattack.png', 495, 583);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/jumpthrow.png', 425, 497);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/run.png', 376, 520);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/slide.png', 397, 401);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/ninjagirl/throw.png', 383, 514);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/dead.png', 562, 519);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/idle.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/jump.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/jumpmelle.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/jumpshoot.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/melee.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/run.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/runshoot.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/shoot.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/robot/slide.png', 567, 556);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventureboy/dead.png', 588, 600);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventureboy/idle.png', 319, 486);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventureboy/jump.png', 407, 536);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventureboy/run.png', 415, 507);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/adventureboy/slide.png', 394,389);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/female_attack.png', 521, 576);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/female_dead.png', 684, 627);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/female_idle.png', 521, 576);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/female_walk.png', 521, 576);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/man_attack.png', 430, 519);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/man_dead.png', 629, 526);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/man_idle.png', 430, 519);
          infinitesurvival.game.load.spritesheet('ms'+ (j++), 'assets/players/zombie/man_walk.png', 430, 519);


    },
    create: function() {
        infinitesurvival.game.state.start('Game');
    },
    update: function() {
    },
    render: function(){
    }
};
