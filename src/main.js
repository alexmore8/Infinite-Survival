(function () {
    'use strict';

    // Configuramos requirejs y todos los componentes que utilizaremos
    requirejs.config({
        baseUrl: "src/",

        paths: {
            phaser:   'bower_components/phaser/build/phaser.min',
            underscore: 'bower_components/underscore/underscore-min',
            moment: 'bower_components/moment/min/moment.min',
            firebase: 'helpers/firebase',
            arbiter: 'bower_components/promissory-arbiter/src/promissory-arbiter'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    // Iniciamos el lanzamiento del juego
    define(function(require, exports, module) {

        // Cargamos Phaser y creamos el juego
        var Phaser      = require('phaser');
        var game        = new Phaser.Game(1366 ,700, Phaser.AUTO, 'phaser-game');
        console.log(window.innerWidth);
        console.log(window.innerHeight);
        console.log(1366);
        console.log((1366*window.innerHeight)/window.innerWidth);

        // Añadimos al juego los parámetros
        var _ = require('underscore');
        var mainConstants = require('helpers/main-constants');
        _.extend(game, mainConstants);

        // Añadimos los diferentes niveles al juego
        game.state.add('boot',     require('modules/boot'));
        game.state.add('load',     require('modules/load'));
        game.state.add('menu',     require('modules/menu'));
        game.state.add('game',     require('modules/game'));
        game.state.add('gameover', require('modules/gameover'));
        game.state.start('boot');
    });
}());
