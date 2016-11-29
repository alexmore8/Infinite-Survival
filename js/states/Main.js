var insur = insur || {};

insur.game = new Phaser.Game(1366 , 768, Phaser.AUTO, 'phaser-example');

insur.game.state.add('Boot', insur.Boot);
insur.game.state.add('Load', insur.Load);
insur.game.state.add('Menu', insur.Menu);
insur.game.state.add('Game', insur.Game);

insur.game.state.start('Boot');
