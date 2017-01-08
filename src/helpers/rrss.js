define(['facebook'],function (require) {

    'use strict';

    function RRSS() {
    }

    RRSS.prototype = {
        facebook: function (distancia) {
            if (distancia == undefined)
                var title = "¿Cuánto te atreves a avanzar? - Infinite Survival";
            else
                var title = "He llegado a recorrer " + distancia + "m. ¿Crees que puedes superarme?";
            FB.init({
                appId      : '1838137776462936',
                xfbml      : true,
                version    : 'v2.8'
            });

            FB.ui(
                {
                    method: 'feed',
                    name: title,
                    link: 'https://manso92.github.io/infinite-survival/',
                    picture: 'https://manso92.github.io/infinite-survival/src/assets/share.png',
                    caption: 'Infinte Survival on Github.io',
                    description: 'Cuando todo lo que te queda es correr para escapar, el desierto no va a ponertelo fácil. Una carrera interminable de acción, recompensas y viajes interdimensionales.',
                    message: '¿Te ves capaz de superarme?'
                },
                function(response) {}
            );
            //var win = window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//manso92.github.io/infinite-survival", '_blank');
            //win.focus()
        },
        twitter: function (distancia) {
            var url = 'https://manso92.github.io/infinite-survival/';
            if (distancia == undefined)
                var message = "¿Cuánto te atreves a avanzar? Empieza ya la aventura " + url;
            else
                var message = "He llegado a recorrer " + distancia + "m. ¿Crees que puedes superarme? " + url;
            var win = window.open("https://twitter.com/home?status=" + message, '_blank');
            win.focus();
        },
        google: function () {
            var win = window.open("https://plus.google.com/share?url=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }
    };

    return RRSS;
});
