var insur = insur || {};

insur.Game = function(){};

insur.Game.prototype = {

    preload: function() {
        background = insur.game.add.image(0,0,'background');
        background2 = insur.game.add.image(1023,0,'background');
        insur.game.time.advancedTiming = true;
    },
    create: function() {

        //initiate groups, we'll recycle elements
        this.floors = insur.game.add.group();
        this.floors.enableBody = true;

        for(var i=0; i<insur.Config.numtiles; i++) {
            newItem = this.floors.create(i * insur.Config.tileSize, insur.game.world.height - insur.Config.tileSize, 'floor');
            newItem.body.immovable = true;
            newItem.body.velocity.x = insur.Config.levelSpeed;
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
        for(i = 0; i < insur.Config.numtiles; i++) {
            if(this.floors.getAt(i).body.x <= -insur.Config.tileSize) {

                if((Math.random() < insur.Config.probCliff) && !this.lastCliff) {
                    salto = 1;
                    this.lastCliff = true;
                }
                else
                    this.lastCliff = false;

                //this.floors.getAt(i).velocity *= 1.05;
                this.floors.getAt(i).body.x = this.lastFloor.body.x + insur.Config.tileSize + salto * insur.Config.tileSize * 2.5;
                if (salto == 1){
                    this.floors.getAt(i).loadTexture('floorl');
                    j = i==0 ? insur.Config.numtiles-1 : i-1;
                    this.floors.getAt(j).loadTexture('floorr');
                } else {
                    this.floors.getAt(i).loadTexture('floor');
                }
                this.lastFloor = this.floors.getAt(i);
                break;
            }
        }
    },
    gameOver: function() {
        insur.game.state.start('Game');
    },
    render: function(){
    }
};