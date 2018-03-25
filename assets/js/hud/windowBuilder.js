game.hud.WindowBuilder = {
  start: function() {
    this.window = Object.create(game.hud.Window);
    this.window.init();

    return this;
  },

  addTitle: function({name = 'Default Title'} = {}) {
    this.window.addPane({
      components: [
        {
          type: 'text',
          text: name,
          height: game.draw.TILE_SIZE,
        },
      ],
    });

    return this;
  },

  addInventory: function({inv = {rows: 0, cols: 0}} = {}) {
    var presRows = Array(inv.rows);
    for (var r = 0; r < inv.rows; r++) {
      presRows[r] = Array(inv.cols);
      for (var c = 0; c < inv.cols; c++) {
        var slot = inv.slots[r][c];
        var pres = Object.create(game.hud.Pressable);
        pres.init({
          height: game.draw.TILE_SIZE,
          width: game.draw.TILE_SIZE,
          onClick: () => {
            if (!game.canvas.cursor.hasItem())
              game.canvas.cursor.setItem(slot.item);
            else if (pres.empty())
              pres.setChild(slot.item);
          },
          onDrawChild: game.draw.item,
        });

        presRows[r][c] = pres;
      }
    }

    for (var presRow of presRows) {
      this.window.addPane({
        components: presRow,
      });
    }

    return this;
  },

  finish: function() {
    this.window.height = this.window.getHeight();
    this.window.width = this.window.getWidth();

    return this.window;
  },
};

