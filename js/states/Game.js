var infinitesurvival = infinitesurvival || {};

infinitesurvival.Game = function(){};

infinitesurvival.Game.prototype = {

    /*preload: function() {
        background = infinitesurvival.game.add.image(0,0,'background');
        background2 = infinitesurvival.game.add.image(1023,0,'background');


        this.sprite = infinitesurvival.game.add.sprite(infinitesurvival.game.world.centerX-80,400,'boy_run');
        this.sprite.scale.setTo(0.4);
        this.sprite.animations.add('walk');
        this.sprite.animations.play('walk' ,20, true);
    },
    create: function() {
    },
    update: function() {
    },
    render: function(){
    },*/
    preload: function() {
        background = infinitesurvival.game.add.image(0,0,'background');
        background2 = infinitesurvival.game.add.image(1023,0,'background');
        this.game.time.advancedTiming = true;
    },
    create: function() {
        var newItem;

        //game params
        this.levelSpeed = -200;
        this.tileSize = 128;
        this.probCliff = 0.4;

        //initiate groups, we'll recycle elements
        this.floors = this.game.add.group();
        this.floors.enableBody = true;

        for(var i=0; i<13; i++) {
            newItem = this.floors.create(i * this.tileSize, this.game.world.height - this.tileSize, 'floor');
            newItem.body.immovable = true;
            newItem.body.velocity.x = this.levelSpeed;
        }

        //keep track of the last floor
        this.lastFloor = newItem;

        //keep track of the last element
        this.lastCliff = false;
    },



    update: function() {

        this.generateTerrain();

    },
    generateTerrain: function(){
        var i, salto = 0;
        for(i = 0; i < this.floors.length; i++) {
            if(this.floors.getAt(i).body.x <= -this.tileSize) {

                if(Math.random() < this.probCliff && !this.lastCliff) {
                    salto = 1;
                    this.lastCliff = true;
                }
                else
                    this.lastCliff = false;


                this.floors.getAt(i).body.x = this.lastFloor.body.x + this.tileSize + salto * this.tileSize * 2.5;
                if (salto == 1){
                    this.floors.getAt(i).loadTexture('floorl');
                    this.floors.getAt(i-1).loadTexture('floorr');
                } else {
                    this.floors.getAt(i).loadTexture('floor');
                }
                this.lastFloor = this.floors.getAt(i);
                break;
            }
        }
    },
    collect: function(player, collectable) {

    },
    gameOver: function() {
        this.game.state.start('Game');
    },
    playerDuck: function() {

    },
    render: function()
    {
    }
};