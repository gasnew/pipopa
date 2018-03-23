var game = {
  init: function (state) {
    console.log(state);
    game.land.init(50, 50);
    game.entities.init(game.land, state.entities);
    game.hud.init(game.land, game.entities, game.draw.canvas.cursor);
    game.draw.init();

    this.subscribeTurnUpdates();
  },

  subscribeTurnUpdates: async function() {
    var res = await game.Net.subscribeTurnUpdates();
    var player = game.entities.players.find(p => p.name == res.playerName);
    if (player) {
      player.turn = res.turn;
      player.fastForward();
      console.log(player.name + '\'s turn updated!');
    }

    this.subscribeTurnUpdates();
  },

  update: () => {
    game.draw.reset();

    game.hud.update();

    game.draw.land(game.land.tiles);
    game.draw.entities.players(game.entities.players);
    game.draw.entities.player(game.entities.player);
  },
};

