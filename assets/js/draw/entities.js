game.draw.entities = {
  init: function(_tile) {
    this._tile = _tile;
  },

  player: function(player) {
    this._tile(player, 'red');
  },

  players: function(players) {
    players.forEach(p => this._tile(p, 'orange'));
  },
};

