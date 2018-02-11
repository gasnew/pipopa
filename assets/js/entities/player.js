game.entities.Player = {
  init : function(addNetAction, x, y, block) {
    this.addNetAction = addNetAction;
    this.x = x;
    this.y = y;
    this.block = block;
  },

  moveTo : function(block) {
    var move = Object.create(game.Action.Move);
    move.init(this.block, block);

    this.addNetAction(move);
    this.applyAction(move);
  },

  applyAction : function(action) {
    if (action.type === 'move') {
      var block = action.toBlock;

      this.x = block.x;
      this.y = block.y;
      this.block = block;
    }
  },
};

