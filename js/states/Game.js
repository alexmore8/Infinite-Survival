var insur = insur || {};

insur.Game = function(){};

insur.Game.prototype = {

    preload: function() {
	this.coin = insur.game.add.sprite(600, 300, 'coins');
        background = insur.game.add.image(0,0,'background');
        background2 = insur.game.add.image(1023,0,'background');
        insur.game.time.advancedTiming = true;
    },
    create: function() {

	this.coin = insur.game.add.sprite(600, 300, 'coins');
        insur.game.physics.arcade.enable(this.coin);
        //this.coin.anchor.setTo(0.5, 0.5);
        this.coin.scale.setTo(2);
        this.coin.body.velocity.x = insur.Config.levelSpeed;
        this.coin.body.y = 600;
	this.coin.animations.add('girar');
        this.coin.animations.play('girar', 20, true);

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


        //initiate groups, we'll recycle elements
        this.platforms = insur.game.add.group();
        this.platforms.enableBody = true;

        for(var i=0; i<insur.Config.numtiles; i++) {
            newItem = this.platforms.create(i * insur.Config.tileSize, insur.game.world.height - insur.Config.tileSize - 300, 'floor');
            newItem.body.immovable = true;
            newItem.body.velocity.x = insur.Config.levelSpeed;
        }

	this.lastPlatform = newItem;

        //keep track of the last element
        this.lastCliff = false;
        //keep track of the last element
        this.lastCliffPlatforms = false;

    },

    update: function() {
        this.generateTerrain();
        this.generatePlatforms();
        //this.generateCoins();
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
    generatePlatforms: function(){
        var i, salto = 0;
        for(i = 0; i < insur.Config.numtiles; i++) {
            if(this.platforms.getAt(i).body.x <= -insur.Config.tileSize) {

                if((Math.random() < insur.Config.probCliff*3) && !this.lastCliffPlatforms) {
                    salto = 1;
                    this.lastCliffPlatforms = true;
                }
                else
                    this.lastCliffPlatforms = false;

                //this.floors.getAt(i).velocity *= 1.05;
		console.log(i);
                this.platforms.getAt(i).body.x = this.lastPlatform.body.x + insur.Config.tileSize + salto * insur.Config.tileSize * 7.5;
                if (salto == 1){
                    this.platforms.getAt(i).loadTexture('floorl');
                    j = i==0 ? insur.Config.numtiles-1 : i-1;
                    this.platforms.getAt(j).loadTexture('floorr');
                } else {
                    this.platforms.getAt(i).loadTexture('floor');
                }
                this.lastPlatform = this.platforms.getAt(i);
                break;
            }
        }
    },
generateCoins: function(){
    

            if(this.coin.body.x <= -200) {
		this.coin.body.x = 1500;
}
    },
    gameOver: function() {
        insur.game.state.start('Game');
    },
    render: function(){
    }
};
