game.hud.Pane = {
  init: function({
    x = 0,
    y = 0,
    cells = [],
  }) {
    this.x = x;
    this.y = y;
    this.cells = cells;

    for (var i = 1; i < cells.length; i++)
      cells[i].x = cells[i-1].x + cells[i-1].width;
  },

  getHeight: function() {
    var heights = this.cells.map(c => c.height);
    return Math.max.apply(null, heights);
  },

  getWidth: function() {
    var widths = this.cells.map(c => c.width);
    return widths.reduce((a, b) => a + b, 0);
  },
};

