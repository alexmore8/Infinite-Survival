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
            rrss: 'helpers/rrss',
            mainconstants: 'helpers/main-constants',
            arbiter: 'bower_components/promissory-arbiter/src/promissory-arbiter',
            facebook: '//connect.facebook.net/es_ES/sdk',

            background: 'sprites/background',
            player: 'sprites/player',
            bloque: 'sprites/bloque',
            muros: 'sprites/muros',
            coin: 'sprites/coin',

            buttongroup: 'sprites/game/buttons/button_group',
            button: 'sprites/game/buttons/button',
            buttontext: 'sprites/game/buttons/button_text',

            progressgroup: 'sprites/game/progress/progress_group',
            progressstatus: 'sprites/game/progress/progress_status',
            progressdata: 'sprites/game/progress/progress_data',

            pausemenu: 'sprites/game/menu/pause_menu',
            help_menu: 'sprites/game/menu/help_menu',
            leaderboard: 'sprites/game/menu/leaderboard',
            leaderboardname: 'sprites/game/menu/leaderboard_name'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            },
            'facebook' : {
                exports: 'FB'
            }
        }
    });

    // Iniciamos el lanzamiento del juego
    define(function(require, exports, module) {

        // Cargamos Phaser y creamos el juego
        var Phaser      = require('phaser');
        var game        = new Phaser.Game(1366 ,670, Phaser.AUTO, 'phaser-game');

        // Añadimos al juego los parámetros
        var _ = require('underscore');
        var mainConstants = require('mainconstants');
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
