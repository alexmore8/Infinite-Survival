define(function (require) {

    'use strict';

    var Arbiter = require ('arbiter');

    function Firebase(username) {
        this.database = firebase.database();
        this.username = username;
    }

    Firebase.prototype = {
        updateDistance: function (data) {
            if ((data.distance == undefined) || (data.distancia < this.distancia)) {
                var updates = {};
                updates[this.username] = this.distancia;
                this.database.ref('distance').update(updates);
            }
            Arbiter.unsubscribe('updateDistance');
            this.distancia = undefined;
        },
        updateCoins: function (data) {
            if ((data.coins == undefined) || (data.coins < this.coins)) {
                var updates = {};
                updates[this.username] = this.coins;
                this.database.ref('coins').update(updates);
            }
            Arbiter.unsubscribe('updateCoins');
            this.coins = undefined;
        },
        updateData: function (coins, distancia) {
            this.coins = coins;
            this.distancia = distancia;
            Arbiter.subscribe('updateCoins', this.updateCoins, null, this);
            Arbiter.subscribe('updateDistance', this.updateDistance, null, this);
            this.database.ref('coins/'+this.username).on('value', function(snapshot) {    Arbiter.publish('updateCoins', {coins: snapshot.val()});          });
            this.database.ref('distance/'+this.username).on('value', function(snapshot) {    Arbiter.publish('updateDistance', {distancia: snapshot.val()});   });
        },
        bestData: function () {
            Arbiter.subscribe('bestCoins',    this.bestCoins, null, this);
            Arbiter.subscribe('bestDistance', this.bestDistance, null, this);
            var starCountRef = firebase.database().ref('coins');
            starCountRef.on('value', function(snapshot) {
                Arbiter.publish('bestCoins', snapshot.val());
            });
            var starCountRef = firebase.database().ref('distance');
            starCountRef.on('value', function(snapshot) {
                Arbiter.publish('bestDistance', snapshot.val());
            });
        },
        bestDistance: function (data) {
            var datos = this.topdata(data);
            Arbiter.publish('distanceload', datos);
            Arbiter.publish('distance', datos);
        },
        bestCoins: function (data) {
            var datos = this.topdata(data);
            Arbiter.publish('coinsload', datos);
            Arbiter.publish('coins', datos);
        },
        topdata: function (objeto) {
            var keys = Object.keys(objeto);
            var data = [];
            for (var i=0 ; i < keys.length; i++){
                data[i] = [];
                data[i]['user'] = keys[i];
                data[i]['score'] = objeto[keys[i]];
            }
            data.sort(function(a, b){return b['score']-a['score']});
            data.splice(5,data.length -5);
            return data;
        }
    };
    return Firebase;
});
