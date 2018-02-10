game.hud = {
  init : function(land, entities, cursor) {
    this.land = land;
    this.entities = entities;
    this.cursor = cursor;

    console.log(cursor);
    this.highBlocks = null;
  },

  update : function() {
    this.highlightBlock();
  },

  highlightBlock : function() {
    var c = this.cursor;
    var s = game.draw.TILE_SIZE;
    var row = Math.floor(c.y / s);
    var col = Math.floor(c.x / s);
    var b = this.land.blocks;

    if (this.highBlock) this.highBlock.unhighlight();
    if (row < b.length && col < b[0].length) {
      this.highBlock = b[row][col];
      this.highBlock.highlight();
    }
  },
};

