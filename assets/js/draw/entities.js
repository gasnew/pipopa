game.draw.entities = {
  init : function(_tile) {
    this._tile = _tile;
  },

  player : function(player) {
    this._tile(player, 'red');
  },
};

