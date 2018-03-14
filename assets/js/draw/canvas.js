game.draw.canvas = {
  cursor: {
    x: 0,
    y: 0,
    get row() {
      return Math.floor(this.y / game.draw.TILE_SIZE);
    },
    get column() {
      return Math.floor(this.x / game.draw.TILE_SIZE);
    },

    down: false,
  },

  canvas: document.getElementById('canvas'),

  init: function() {
    this.context = this.canvas.getContext('2d');

    var that = this;
    this.canvas.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });
    this.canvas.addEventListener('mousedown', (e) => {
      this.cursor.down = true;
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.cursor.down = false;
    });

    this.reset();

    return this.context;
  },

  reset: function() {
    var ctx = this.context;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'green';
  },
};

