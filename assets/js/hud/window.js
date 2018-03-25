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

    this.panes.push(pane);
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

