game.canvas = {
  cursor : {
    x : 0,
    y : 0
  },

  canvas : document.createElement('canvas'),

  init : function() {
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    var that = this;
    this.canvas.addEventListener('mousemove', (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });

    game.canvas.draw.init(this.context);

    this.reset();
  },

  reset : function () {
    var ctx = this.context;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'green';
  }
};
