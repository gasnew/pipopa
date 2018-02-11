game.Action.Move = Object.create(game.Action);

Object.assign(game.Action.Move, {
  init : function(fromBlock, toBlock) {
    game.Action.init.call(this, 'move');

    this.fromBlock = fromBlock;
    this.toBlock = toBlock;
  },
});

