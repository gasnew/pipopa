game.hud = {
  init: function(land, entities, cursor) {
    this.land = land;
    this.entities = entities;
    this.cursor = cursor;

    this.highTile = null;
    this.downTile = null;
  },

  update: function() {
    this.highlightTile();
    var clickedTile = this.getClickedTile();

    if (clickedTile && game.Math.tilesTo(this.entities.player.tile, clickedTile) === 1) {
      this.entities.player.moveTo(clickedTile);
    }
  },

  highlightTile: function() {
    var row = this.cursor.row;
    var col = this.cursor.column;

    if (this.highTile) this.highTile.unhighlight();
    this.highTile = this.land.tileAt(row, col);
    if (this.highTile) this.highTile.highlight();
  },

  getClickedTile: function() {
    var db = this.downTile;
    var hb = this.highTile;
    var land = this.land;
    var c = this.cursor;

    if (!db && c.down)
      this.downTile = hb;
    if (!c.down) {
      this.downTile = null;
      if (db === hb)
        return db;
    }

    return null;
  },
};

