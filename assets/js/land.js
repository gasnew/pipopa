var land = {
	blocks : [],

	init : function (rows, cols) {
		this.blocks = new Array(rows);

		for (var i = 0; i < rows; i++) {
			this.blocks[i] = Array(cols);
		}
	},
};

