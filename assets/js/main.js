//THE START OF MY GAME SO EXCITING

(() => {
  // GET SERVER STATE
  game.Net.State.getServerState().then(state => {
    game.init(state);

    window.setInterval(function() {
      game.update();
    }, 16.7);
  });
})();

