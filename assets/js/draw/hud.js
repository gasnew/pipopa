game.draw.hud = {
  init: function(winBack) {
    this.winBack = winBack;
  },

  windows: function(windows) {
    for (var name in windows) {
      if (windows.hasOwnProperty(name)) {
        var w = windows[name];
        this.winBack(w.x, w.y, w.height, w.width);

        for (var pane of w.panes) {
          for (var cell of pane.cells) {
            if (!cell.empty()) {
              var x = w.x + pane.x + cell.x;
              var y = w.y + pane.y + cell.y;
              cell.onDrawContent(cell.content, x, y);
            }
          }
        }
      }
    }
  },

  cursor: function(cursor) {
    if (!cursor.empty()) {
      cursor.onDrawContent(cursor.content, cursor.x, cursor.y);
    }
  },
};

