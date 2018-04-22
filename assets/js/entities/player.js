game.entities.Player = {
  init: function(name, x, y, tile, inventory) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.tile = tile;
    this.inventory = inventory;
    this.turn = null;

    return this;
  },

  // MOVE
  moveTo: async function(tile) {
    var moveRequest = Object.create(game.Action.MoveRequest);
    moveRequest.init(this.tile, tile);

    this.applyAction(moveRequest);
    this.sendAction(moveRequest);
  },

  // TRANSFER
  transferFromContainer: null,
  transferThroughContainer: null,
  startTransfer: function({from, through}) {
    through.setContent(from.content);
    from.setContent(null);

    this.transferFromContainer = from;
    this.transferThroughContainer = through;
    console.log('transfer started');
  },
  pendingTransfer: function() {
    return this.transferFromContainer != null;
  },
  completeTransfer: function({to}) {
    this.transferFromContainer.setContent(this.transferThroughContainer.content);
    this.transferThroughContainer.setContent(null);

    console.log('transfer completed');
    var transferRequest = Object.create(game.Action.TransferRequest);
    transferRequest.init({
      fromContainer: this.transferFromContainer,
      toContainer: to
    });

    this.applyAction(transferRequest);
    this.sendAction(transferRequest);
    console.log(transferRequest);

    this.transferFromContainer = null;
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
    } else if(action.type == 'transfer') {
      var from = action.content.fromContainer;
      var to = action.content.toContainer;

      to.setContent(from.content);
      from.setContent(null);
    }
  },

  undoAction: function(action) {
    if (action.type === 'move') {
      var tile = action.content.fromTile;

      this.x = tile.x;
      this.y = tile.y;
      this.tile = tile;
    } else if(action.type == 'transfer') {
      var from = action.content.fromContainer;
      var to = action.content.toContainer;

      from.setContent(to.content);
      to.setContent(null);
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

