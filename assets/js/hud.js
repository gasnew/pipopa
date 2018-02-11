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

    if (clickedBlock && game.Math.blocksTo(this.entities.player.block, clickedBlock) === 1) {
      this.entities.player.moveTo(clickedBlock);
    }
  },

  highlightBlock : function() {
    var row = this.cursor.row;
    var col = this.cursor.column;

    if (this.highBlock) this.highBlock.unhighlight();
    this.highBlock = this.land.blockAt(row, col);
    if (this.highBlock) this.highBlock.highlight();
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

