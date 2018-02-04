game.Tile = {
  x : 0,
  y : 0,
  highlighted : false,

  init : function(x, y) {
    this.x = x;
    this.y = y;

    return this;
  },

  highlight : function() {
    this.highlighted = true;
  },

  unhighlight : function() {
    this.highlighted = false;
  },
};

