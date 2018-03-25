game.draw = {
  TILE_SIZE: 16,

  init: function() {
    this.context = this.canvas.init();
    this.entities.init((tile, color) => this._tile(tile, color));
    this.hud.init((x, y, h, w) => this._rect(x, y, h, w));
  },

  reset: function() {
    this.canvas.reset();
  },

  chunk: function(tiles) {
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
  },

  _rect: function(x, y, h, w, color = 'gray') {
    var ctx = this.context;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  },

  item: function(item, x, y) {
    var ctx = this.context;

    var ts = this.TILE_SIZE;
    ctx.fillStyle = 'purple';
    ctx.fillRect(x, y, ts, ts);
  },

  text: function({text = 'def text', size = this.TILE_SIZE}, x, y) {
    // console.log(text);
    // console.log(size);
    // console.log(x, y);
  },
};

