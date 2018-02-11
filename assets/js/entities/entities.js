game.entities = {
  init : function(land, addNetAction) {
    this.land = land;
    this.addNetAction = addNetAction;

    this.player = Object.create(this.Player);
    this.player.init(addNetAction, 25, 25, land.blockAt(25, 25));
  },
};

