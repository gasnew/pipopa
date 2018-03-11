var game = {
  init: (state) => {
    game.land.init(50, 50);
    game.entities.init(game.land, state.entities);
    game.hud.init(game.land, game.entities, game.draw.canvas.cursor);
    game.draw.init();
  },

  update: () => {
    game.draw.reset();

    game.hud.update();

    game.draw.land(game.land.tiles);
    game.draw.entities.player(game.entities.player);
  },
};

