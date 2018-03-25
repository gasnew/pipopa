game.hud.Pressable = {
  init: function({
    type = 'pressable',
    height = game.draw.TILE_SIZE,
    width = game.draw.TILE_SIZE,
    onClick = () => {},
    onDrawChild = () => {},
  } = {}) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.onClick = onClick;
    this.onDrawChild = onDrawChild;
    this.child = null;

  },

  setChild: function(child) {
    this.child = child;
  },

  empty: function() {
    return this.child == null;
  },
};

