var insur = insur || {};

insur.game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, 'phaser-example');

insur.game.global = {
    puntuacion: 0
};

insur.game.state.add('Boot', insur.Boot);
insur.game.state.add('Load', insur.Load);
insur.game.state.add('Menu', insur.Menu);
insur.game.state.add('Game', insur.Game);
insur.game.state.add('GameOver', insur.GameOver);

insur.game.state.start('Boot');
