game.draw.item = function(item, x, y) {
  var ctx = this.context;

  var ts = this.TILE_SIZE;
  ctx.fillStyle = 'purple';
  ctx.fillRect(x, y, ts, ts);
};

