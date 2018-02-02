var draw = {
	TILE_WIDTH : 16,
	TILE_HEIGHT : 16,

	canvas : document.createElement('canvas'),

	init : function () {
		this.canvas.width = 640;
		this.canvas.height = 480;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);

		this.context.fillRect(0, 0, 30, 30);
	},

	land : function () {
		var b = land.blocks;
		for (var i = 0; i < b.length; i++) {
			var r = b[i];
			for (var j = 0; j < r.length; j++) {
				this._tile({x : j, y : i});
			}
		}
	},
	
	_tile : function (
		{ x = 0, y = 0 }) {
		ctx = this.context;

		var tw = this.TILE_WIDTH;
		var th = this.TILE_HEIGHT;
		ctx.fillRect(x * tw, y * th, tw, th);
	}
};

