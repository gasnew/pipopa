game.Math = {
  blocksTo: function(b1, b2) {
    return Math.abs(b2.x - b1.x) + Math.abs(b2.y - b1.y);
  },
};
