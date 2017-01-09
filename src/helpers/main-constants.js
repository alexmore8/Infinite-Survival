define(function(require, exports, module) {
    'use strict';
    var constants = {
        DEBUG               : false,
        MUSICVOLUME         : 0.2,
        EFFECTVOLUME        : 0.2,

        // Dimensiones de elementos del juego
        TILESIZE            : 128,

        // Configuración del juego
        GRAVITY             : 2500,
        JUMPVEL             : 1000,
        LEVELSPEED          : 500,
        MAXLEVEL            : -500,
        PROBCLIFF           : 0.3,
        NUMTILES            : 50,


        // Configuración de las monedas
        PROBGOLD            : 0.05,
        PROBSILVER          : 0.2,
        BRONZEVALUE         : 1,
        SILVERVALUE         : 2,
        GOLDVALUE           : 5,
        COINHEIGHT          : 250
    };
    return constants;
});
