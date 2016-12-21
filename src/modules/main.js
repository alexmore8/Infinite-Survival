var SideScroller = SideScroller || {};

SideScroller.game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, '');

SideScroller.game.state.add('Boot', SideScroller.Boot);
SideScroller.game.state.add('Preload', SideScroller.Preload);
SideScroller.game.state.add('Game', SideScroller.Game);

SideScroller.game.state.start('Boot');
