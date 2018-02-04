game.hud = {
  init : function(land, cursor) {
    this.land = land;
    this.cursor = cursor;

    console.log(cursor);
    this.highBlocks = null;
  },

  update : function() {
    var c = this.cursor;
    var s = game.canvas.draw.TILE_SIZE;
    var row = Math.floor(c.y / s);
    var col = Math.floor(c.x / s);
    var b = this.land.blocks;

    if (this.highBlock) this.highBlock.unhighlight();
    this.highBlock = b[row][col];
    this.highBlock.highlight();
  }
};

