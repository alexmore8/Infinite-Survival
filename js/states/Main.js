var infinitesurvival = infinitesurvival || {};

infinitesurvival.game = new Phaser.Game(1366 , 768, Phaser.AUTO, 'phaser-example');

infinitesurvival.game.state.add('Boot', infinitesurvival.Boot);
infinitesurvival.game.state.add('Load', infinitesurvival.Load);
infinitesurvival.game.state.add('Menu', infinitesurvival.Menu);
infinitesurvival.game.state.add('Game', infinitesurvival.Game);

infinitesurvival.game.state.start('Boot');
