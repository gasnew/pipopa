game.hud.Window = {
  init: function({x = 0, y = 0}) {
    this.x = x;
    this.y = y;
    this.panes = [];
    this.height = null;
    this.width = null;
  },

  addPane: function(components) {
    var pane = Object.create(game.hud.Pane);
    pane.init(components);
    this._addCellDownListeners(pane, components.cells);

    this.panes.push(pane);
  },

  _addCellDownListeners: function(pane, cells) {
    for (let cell of cells) {
      var c = game.draw.canvas.cursor;
      c.downEventTarget.addEventListener('cursordown', () => {
        var rect = {
          x: this.x + pane.x + cell.x,
          y: this.y + pane.y + cell.y,
          height: cell.height,
          width: cell.width,
        };
        if (c.inRect(rect))
          cell.onDown();
      });
    }
  },

  getBottom: function() {
    return this.y + this.getHeight();
  },

  getHeight: function() {
    var heights = this.panes.map(p => p.getHeight());
    return heights.reduce((a, b) => a + b, 0);
  },

  getWidth: function() {
    var widths = this.panes.map(p => p.getWidth());
    return Math.max.apply(null, widths);
  },
};

