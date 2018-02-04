game.canvas.draw = {
	TILE_SIZE : 16,

	init : function (context) {
    this.context = context;
	},

	land : function (blocks) {
    var b = blocks;
		for (var i = 0; i < b.length; i++) {
			var r = b[i];
			for (var j = 0; j < r.length; j++) {
				this._tile(r[j]);
			}
		}
	},
	
	_tile : function (tile) {
		ctx = this.context;

		var ts = this.TILE_SIZE;
    var t = tile;
    var x = t.x;
    var y = t.y;
    var d = () => ctx.fillRect(x * ts, y * ts, ts, ts);

    if (tile.highlighted) {
      var style = ctx.fillStyle;
      ctx.fillStyle = 'white';
      d();
      ctx.fillStyle = style;
    } else {
      d();
    }
	}
};

