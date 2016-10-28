var SideScroller = SideScroller || {};

infinitesurvival.game = new Phaser.Game(1200, 650, Phaser.AUTO, 'phaser-example');

infinitesurvival.game.state.add('Boot', infinitesurvival.Boot);
infinitesurvival.game.state.add('Game', infinitesurvival.Game);

infinitesurvival.game.state.start('Boot');
