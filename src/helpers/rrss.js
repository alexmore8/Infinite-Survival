define(['facebook'],function (require) {

    'use strict';

    function RRSS() {
    }

    RRSS.prototype = {
        facebook: function () {

            FB.init({
                appId      : '1838137776462936',
                version    : 'v2.8'
            });

            FB.ui({
                method: 'share',
                href: 'https://developers.facebook.com/docs/',
            }, function(response){});
            //var win = window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A//manso92.github.io/infinite-survival", '_blank');
            //win.focus()
        },
        twitter: function () {
            var win = window.open("https://twitter.com/home?status=Acabo%20de%20probar%20Infinite%20Survival,%20%C2%BFpuedes%20superarme?%20https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        },
        google: function () {
            var win = window.open("https://plus.google.com/share?url=https%3A//manso92.github.io/infinite-survival", '_blank');
            win.focus();
        }
    };

    return RRSS;
});
