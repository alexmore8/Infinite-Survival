(function () {
    'use strict';

    requirejs.config({
        baseUrl: "src/",

        paths: {
            phaser:   'bower_components/phaser/build/phaser.min',
            underscore: 'bower_components/underscore/underscore-min',
            game: 'game'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    define(function(require, exports, module) {

        var Phaser      = require('phaser');
        var Boot        = require('modules/boot');
        var Load        = require('modules/load');
        var Menu        = require('modules/menu');
        var Game        = require('modules/game');
        var GameOver    = require('modules/gameover');
        var game        = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, 'phaser-game');

        // Add game states from modules
        game.state.add('boot', Boot);
        game.state.add('load', Load);
        game.state.add('menu', Menu);
        game.state.add('game', Game);
        game.state.add('gameover', GameOver);
        game.state.start('boot');
    });
}());
