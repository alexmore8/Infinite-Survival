var insur = insur || {};

insur.Menu = function(){};

insur.Menu.prototype = {

    preload: function() {
        background = insur.game.add.image(0,0,'bg_menu');
        var loadingLabel = insur.game.add.text(insur.game.world.centerX, 150, 'Infinite Survival',{ font: '100px VT323',  fill: '#000000' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        buttonstart = insur.game.add.button(insur.game.world.centerX - 100,500, 'button',this.changebutton,this);
        buttonstart.scale.setTo(0.5, 0.5);


        var startLabel = insur.game.add.text(insur.game.world.centerX-10, 540, 'Start',{ font: '50px VT323',  fill: '#000000' });
        startLabel.anchor.setTo(0.5, 0.5);
    },
    create: function() {
    },
    update: function() {
    },
    render: function(){
    },
    changebutton: function(){
        insur.game.state.start('Game');
    }
};
