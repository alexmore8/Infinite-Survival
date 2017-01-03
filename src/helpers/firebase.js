define(function (require) {

    'use strict';

    var _ = require('underscore');
    var Moment = require('moment');


    function Firebase() {
        this.database = firebase.database();
    }

    Firebase.prototype = {
        insertDistance: function (username,distance) {
            this.database.ref('distance/'+username).set({
                score: distance
            });
        }
    };
    return Firebase;
});
