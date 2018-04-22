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
    inRect: function(r) {
      return this.x >= r.x &&
        this.y >= r.y &&
        this.x < r.x + r.width &&
        this.y < r.y + r.height;
    },

    down: false,
    downEvent: new Event('cursordown'),
    downEventTarget: new EventTarget(),

    content: null,
    setContent: function(content) {
      this.content = content;
      
    },
    empty: function() {
      return this.content == null;
    },

    onDrawContent: (content, x, y) => game.draw.item(content, x, y),
  },

  canvas: document.getElementById('canvas'),

  init: function() {
    this.context = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });
    this.canvas.addEventListener('mousedown', () => {
      this.cursor.down = true;
      this.cursor.downEventTarget.dispatchEvent(this.cursor.downEvent);
    });
    this.canvas.addEventListener('mouseup', () => {
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

