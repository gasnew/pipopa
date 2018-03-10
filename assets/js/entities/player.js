game.entities.Player = {
  init: function(x, y, block) {
    this.x = x;
    this.y = y;
    this.block = block;
    this.turn = null;
  },

  moveTo: function(block) {
    var moveRequest = Object.create(game.Action.MoveRequest);
    moveRequest.init(this.block, block);

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
      var block = action.toBlock;

      this.x = block.x;
      this.y = block.y;
      this.block = block;
    }
  },
};

