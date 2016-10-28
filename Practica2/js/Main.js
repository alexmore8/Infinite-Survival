/*var infinitesurvival = infinitesurvival || {};

infinitesurvival.game = new Phaser.Game(746, 420, Phaser.AUTO, '');

infinitesurvival.game.state.add('Boot', infinitesurvival.Boot);
//infinitesurvival.game.state.add('Boot', infinitesurvival.Menu);
//infinitesurvival.game.state.add('Boot', infinitesurvival.TopChart);
//infinitesurvival.game.state.add('Boot', infinitesurvival.Settings);
infinitesurvival.game.state.add('Game', infinitesurvival.Game);

infinitesurvival.game.state.start('Boot');
*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('mummy', 'assets/players/adventure_girl/run.png', 641, 542);

}

var back;
var mummy;
var anim;
var loopText;

function create() {


    mummy = game.add.sprite(0, 0, 'mummy', 5);
    mummy.scale.set(4);
    mummy.smoothed = false;
    anim = mummy.animations.add('walk');

    anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);

    anim.play(10, true);

}

function animationStarted(sprite, animation) {

    game.add.text(32, 32, 'Animation started', { fill: 'white' });

}

function animationLooped(sprite, animation) {

    if (animation.loopCount === 1)
    {
        loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else
    {
        loopText.text = 'Animation looped x2';
        animation.loop = false;
    }

}

function animationStopped(sprite, animation) {

    game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });

}

function update() {

    if (anim.isPlaying)
    {
    }

}
