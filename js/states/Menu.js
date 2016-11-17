var infinitesurvival = infinitesurvival || {};

infinitesurvival.Menu = function(){};

infinitesurvival.Menu.prototype = {

    preload: function() {
        background = infinitesurvival.game.add.image(0,0,'bg_menu');
        var loadingLabel = infinitesurvival.game.add.text(infinitesurvival.game.world.centerX, 150, 'Infinite Survival',{ font: '100px VT323',  fill: '#000000' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        buttonstart = infinitesurvival.game.add.button(501,500, 'button',this.changebutton,this);
        buttonstart.scale.setTo(0.5, 0.5);


        var loadingLabel = infinitesurvival.game.add.text(infinitesurvival.game.world.centerX-10, 540, 'Start',{ font: '50px VT323',  fill: '#000000' });
        loadingLabel.anchor.setTo(0.5, 0.5);
    },
    create: function() {
    },
    update: function() {
    },
    render: function(){
    },
    changebutton: function(){

        infinitesurvival.game.state.start('Game');
    }
};
