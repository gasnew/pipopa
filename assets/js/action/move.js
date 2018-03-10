game.Action.MoveRequest = Object.create(game.Action);

Object.assign(game.Action.MoveRequest, {
  init : function(fromBlock, toBlock) {
    game.Action.init.call(this, 'move');

    this.fromBlock = fromBlock;
    this.toBlock = toBlock;
  },
});

