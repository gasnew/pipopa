game.Net.State = {
  getServerState: function() {
    return new Promise(async (resolve, reject) => {
      var state = {};

      var chunk = await this.getChunk();
      state.chunk = chunk;

      var player = await this.getPlayer();
      var players = await this.getPlayers();

      state.entities = {
        mainPlayer: player,
        players: players,
      };

      resolve(state);
    });
  },

  getChunk: async function() {
    var response = await game.Net.get('chunks/main');
    var height = response.height;
    var width = response.width;
    var chunk = Object.create(game.Chunk);

    var tiles = Array(height);
    for (var r = 0; r < height; r++) {
      tiles[r] = Array(width);
      for (var c = 0; c < width; c++) {
        tiles[r][c] = this.makeTile(response.Tiles, c, r);
      }
    }

    chunk.init(tiles);

    return chunk;
  },

  makeTile: function(data, x, y) {
    var tileData = data.find(t => t.x === x && t.y === y);

    var tile = Object.create(game.Tile);
    tile.init(tileData.id, x, y);

    if (tileData.Item)
      tile.setItem(this.makeItem(tileData.Item));

    return tile;
  },

  getPlayer: async function() {
    var response = await game.Net.get('players/main');
    var name = response.name;
    var x = response.x;
    var y = response.y;
    var player = Object.create(game.entities.Player);

    player.init(name, x, y, null, await this.getInventory());
    player.turn = await game.Net.getTurn();
    player.fastForward();

    return player;
  },

  getPlayers: function() {
    return new Promise(async (resolve, reject) => {
      var response = await game.Net.get('players/all');
      resolve(response.map(p => {
        var name = p.name;
        var x = p.x;
        var y = p.y;
        var player = Object.create(game.entities.Player);

        //TODO add tile to init when tile in server
        return player.init(name, x, y, null);
      }));
    });
  },

  getInventory: async function() {
    var response = await game.Net.get('inventories/main');
    var rows = response.rows;
    var cols = response.cols;
    var slots = new Array(rows);

    for (var r = 0; r < rows; r++) {
      slots[r] = Array(cols);
      for (var c = 0; c < cols; c++) {
        slots[r][c] = this.makeSlot(response.InvSlots, r, c);
      }
    }

    var inv = Object.create(game.hud.Inventory);
    inv.init(rows, cols, slots);

    return inv;
  },

  makeSlot: function(data, r, c) {
    var slotData = data.find(s => s.row === r && s.col === c);

    var slot = {};
    if (slotData.Item)
      slot.item = this.makeItem(slotData.Item);

    return slot;
  },

  makeItem: function(data) {
    var item = Object.create(game.hud.Item);
    item.init(data.type);

    return item;
  }
};
