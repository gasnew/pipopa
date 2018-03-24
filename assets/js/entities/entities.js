game.entities = {
  init: function(chunk, entities) {
    this.chunk = chunk;

    this.player = entities.mainPlayer;
    this.players = entities.players;
    this.player.tile = chunk.tileAt(this.player.y, this.player.x);
  },
};

