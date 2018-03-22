game.draw = {
  TILE_SIZE: 16,

  init: function() {
    this.context = this.canvas.init();
    this.entities.init((tile, color) => this._tile(tile, color));
  },

  reset: function() {
    this.canvas.reset();
  },

  land: function(tiles) {
    var b = tiles;
    for (var i = 0; i < b.length; i++) {
      var r = b[i];
      for (var j = 0; j < r.length; j++) {
        this._tile(r[j]);
      }
    }
  },

  _tile: function(tile, color = 'green') {
    var ctx = this.context;

    var ts = this.TILE_SIZE;
    var t = tile;
    var x = t.x;
    var y = t.y;
    var draw = () => ctx.fillRect(x * ts, y * ts, ts, ts);

    if (tile.highlighted) {
      var style = ctx.fillStyle;
      ctx.fillStyle = 'white';
      draw();
      ctx.fillStyle = style;
    } else {
      ctx.fillStyle = color;
      draw();
    }
  }
};

