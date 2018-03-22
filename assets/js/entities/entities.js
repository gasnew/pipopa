game.entities = {
  init: function(land, entities) {
    this.land = land;

    this.player = entities.mainPlayer;
    this.players = entities.players;
    this.player.tile = land.tileAt(this.player.y, this.player.x);
  },
};

