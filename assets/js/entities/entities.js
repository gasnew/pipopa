game.entities = {
  init: function(land) {
    this.land = land;

    this.player = Object.create(this.Player);
    this.player.init(25, 25, land.tileAt(25, 25));
  },
};

