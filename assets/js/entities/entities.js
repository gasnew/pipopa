game.entities = {
  init : function(land) {
    this.land = land;

    this.player = Object.create(this.Player);
    this.player.init(25, 25, land.blockAt(25, 25));
  },
};

