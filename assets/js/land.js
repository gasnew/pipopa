game.land = {
  blocks: [],

  init: function(rows, cols) {
    this.blocks = new Array(rows);

    for (var i = 0; i < rows; i++) {
      this.blocks[i] = Array(cols);
      for (var j = 0; j < cols; j++) {
        var new_b = Object.create(game.Tile);
        this.blocks[i][j] = new_b.init(j, i);
      }
    }
  },

  blockAt: function(row, col) {
    if (row < this.blocks.length && col < this.blocks[0].length) {
      return this.blocks[row][col];
    }

    return null;
  },
};

