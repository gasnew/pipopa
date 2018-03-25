game.hud.Pane = {
  init: function({
    components = [{
      type: 'text',
      text: 'Default Pane',
      height: game.draw.TILE_SIZE,
    }]
  }) {
    this.components = components;
  },

  getHeight: function() {
    var heights = this.components.map(c => c.height);
    return Math.max.apply(null, heights);
  },

  getWidth: function() {
    var widths = this.components.map(c => c.width);
    return widths.reduce((a, b) => a + b, 0);
  },
};

