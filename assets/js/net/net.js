game.Net = {
  request: function(type, addr, content = {}) {
    return new Promise((resolve, reject) => {
      xhttp = new XMLHttpRequest();
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

  post: function(addr, content) {
    return this.request('POST', addr, content);
  },

  get: function(addr) {
    return this.request('GET', addr);
  },

  buildRequestResponse: function(resolve, reject) {
    return function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var content = JSON.parse(this.responseText);
          resolve(content);
        } else if(this.status == 400) {
          var response = {
            'error': 'BAD REQUESTS ALL OVER',
          };
          reject(response);
        }
      }
    };
  },

  getServerState: function() {
    return new Promise((resolve, reject) => {
      var state = {};
      this.getPlayers()
      .then(p => {
        state.entities = {
          players: p,
        };

        resolve(state);
      });
    });
  },

  getPlayers: function() {
    return new Promise((resolve, reject) => {
      this.get('players/all').then(p_data => {
        resolve(p_data.map(p => {
          var x = p.x;
          var y = p.y;
          player = Object.create(game.entities.Player);

          //TODO add tile to init when tile in server
          return player.init(x, y, null);
        }));
      });
    });
  },

  postAction: function(actionRequest) {
    return this.post('turns/new-action', actionRequest);
  },
};

