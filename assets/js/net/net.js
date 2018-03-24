game.Net = {
  reqQueue: [],

  addRequest: function(type, addr, content = {}) {
    return new Promise((resolve, reject) => {
      this.reqQueue.push(() => {
        this.sendRequest(type, addr, content)
          .then((response) => {
            if (response.success)
              resolve(response.content);
            else
              reject(response.content);
          })
          .then(() => {
            this.reqQueue.shift();
            if (this.reqQueue.length > 0) {
              this.reqQueue[0]();
            }
          });
      });

      if (this.reqQueue.length === 1) {
        this.reqQueue[0]();
      }
    });
  },

  addRequestNoQueue: function(type, addr, content = {}) {
    return new Promise((resolve, reject) => {
      this.sendRequest(type, addr, content)
        .then((response) => {
          if (response.success)
            resolve(response.content);
          else
            reject(response.content);
        });
    });
  },

  sendRequest: function(type, addr, content) {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = this.buildRequestResponse(resolve, reject);
      xhttp.open(type, window.location.href + addr, true);

      if (type == 'POST') {
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(content));
      } else {
        xhttp.send();
      }
    });
  },

  clearQueue: function() {
    this.reqQueue.length = 0;
  },

  post: function(addr, content) {
    return this.addRequest('POST', addr, content);
  },

  get: function(addr, noQueue=false) {
    if (noQueue)
      return this.addRequestNoQueue('GET', addr);
    else
      return this.addRequest('GET', addr);
  },

  buildRequestResponse: function(resolve, reject) {
    return function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var response = JSON.parse(this.responseText);
          resolve(response);
        } else if(this.status == 400) {
          var response_err = {
            'error': 'BAD REQUESTS ALL OVER',
          };
          reject(response_err);
        }
      }
    };
  },

  getServerState: function() {
    return new Promise(async (resolve, reject) => {
      var state = {};

      var chunk = await this.getChunk();
      state.chunk = chunk;

      var player = await this.getPlayer();
      var players = await this.getPlayers();

      state.entities = {
        chunk: chunk,
        mainPlayer: player,
        players: players,
      };

      resolve(state);
    });
  },

  getChunk: async function() {
    var response = await this.get('chunks/main');
    var height = response.height;
    var width = response.width;
    var chunk = Object.create(game.Chunk);

    chunk.init(height, width);

    return chunk;
  },

  getPlayer: async function() {
    var response = await this.get('players/main');
    var name = response.name;
    var x = response.x;
    var y = response.y;
    var player = Object.create(game.entities.Player);

    player.init(name, x, y, null);
    player.turn = await this.getTurn();
    player.fastForward();

    return player;
  },

  getPlayers: function() {
    return new Promise(async (resolve, reject) => {
      var response = await this.get('players/all');
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

  postAction: function(actionRequest) {
    return this.post('turns/new-action', actionRequest);
  },

  submitTurn: function() {
    return this.get('turns/submit');
  },

  getTurn: function() {
    return this.get('turns/current');
  },

  newTurn: function() {
    return this.get('turns/force-finish');
  },

  subscribeTurnUpdates: function() {
    return this.get('turns/subscribe-turn-updates', true);
  },
};

