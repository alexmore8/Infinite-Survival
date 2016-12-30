
define(function(require, exports, module) {
    'use strict';
    var constants = {
        // Dimensiones de elementos del juego
        TILESIZE            : 128,

        // Configuración del juego
        LEVELSPEED          : 500,
        MAXLEVEL            : -500,
        PROBCLIFF           : 0.3,
        NUMTILES            : 20,


        // Configuración de las monedas
        PROBGOLD            : 0.05,
        PROBSILVER          : 0.2,
        BRONZEVALUE         : 1,
        SILVERVALUE         : 2,
        GOLDVALUE           : 5
    };
    return constants;
});
