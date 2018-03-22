game.entities.Player = {
  init: function(x, y, tile) {
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.turn = null;

    return this;
  },

  moveTo: async function(tile) {
    var moveRequest = Object.create(game.Action.MoveRequest);
    moveRequest.init(this.tile, tile);

    this.applyAction(moveRequest);
    this.sendAction(moveRequest);
  },

  fastForward: function() {
    for (var action of this.turn) {
      this.applyAction(action);
    }
  },

  rewind: function() {
    for (var action of this.turn.reverse()) {
      this.undoAction(action);
    }
  },

  applyAction: async function(action) {
    if (action.type === 'move') {
      var tile = action.content.toTile;

      this.x = tile.x;
      this.y = tile.y;
      this.tile = tile;
    }
  },

  undoAction: function(action) {
    if (action.type === 'move') {
      var tile = action.content.fromTile;

      this.x = tile.x;
      this.y = tile.y;
      this.tile = tile;
    }
  },

  sendAction: async function(action) {
    try {
      var turn = await game.Net.postAction(action);
      console.log(turn);
      this.turn = turn;
    } catch(turn) {
      console.error('Action failed!');
      this.undoAction(action);
      this.rewind();
      this.turn = turn;
      this.fastForward();
    }
  },
};

