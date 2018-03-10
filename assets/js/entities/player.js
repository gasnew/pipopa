game.entities.Player = {
  init: function(x, y, tile) {
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.turn = null;
  },

  moveTo: function(tile) {
    var moveRequest = Object.create(game.Action.MoveRequest);
    moveRequest.init(this.tile, tile);

    game.Net.postAction(moveRequest, this.buildReceiveTurn());

    this.applyAction(moveRequest);
  },

  buildReceiveTurn: function() {
    return (response_obj) => {
      this.turn = response_obj;
      console.log(response_obj);
    };
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

