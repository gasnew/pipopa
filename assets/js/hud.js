game.hud = {
  init : function(land, entities, cursor) {
    this.land = land;
    this.entities = entities;
    this.cursor = cursor;

    this.highBlock = null;
    this.downBlock = null;
  },

  update : function() {
    this.highlightBlock();
    var clickedBlock = this.getClickedBlock();
    if (clickedBlock) console.log(clickedBlock);
  },

  highlightBlock : function() {
    var row = this.cursor.row;
    var col = this.cursor.column;
    var b = this.land.blocks;

    if (this.highBlock) this.highBlock.unhighlight();
    if (row < b.length && col < b[0].length) {
      this.highBlock = b[row][col];
      this.highBlock.highlight();
    }
  },

  getClickedBlock : function() {
    var db = this.downBlock;
    var hb = this.highBlock;
    var land = this.land;
    var c = this.cursor;

    if (!db && c.down)
      this.downBlock = hb;
    if (!c.down) {
      this.downBlock = null;
      if (db === hb)
        return db;
    }

    return null;
  },
};

