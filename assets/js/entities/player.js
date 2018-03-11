game.entities.Player = {
  init: function(x, y, tile) {
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.turn = null;

    return this;
  },

  moveTo: function(tile) {
    var moveRequest = Object.create(game.Action.MoveRequest);
    moveRequest.init(this.tile, tile);

    game.Net.postAction(moveRequest).then(turn => {
      console.log(turn);
      this.turn = turn;
    });

    this.applyAction(moveRequest);
  },

  applyAction: function(action) {
    if (action.type === 'move') {
      var tile = action.content.toTile;

      this.x = tile.x;
      this.y = tile.y;
      this.tile = tile;
    }
  },
};

