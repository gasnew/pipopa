game.entities = {
  init: function(land, entities) {
    this.land = land;

    this.players = entities.players;
    this.player = this.players[0];
    this.player.tile = land.tileAt(this.player.x, this.player.y);
  },
};

