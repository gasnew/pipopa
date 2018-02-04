var game = {
	init : () => {
    game.land.init(50, 50);
    game.hud.init(game.land, game.canvas.cursor);
		game.canvas.init();
	},

  update : () => {
    game.canvas.reset();

    game.hud.update();

    game.canvas.draw.land(game.land.blocks);
  }
};

