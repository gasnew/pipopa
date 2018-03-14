game.Net = {
  reqQueue: [],

  addRequest: function(type, addr, content = {}) {
    return new Promise((resolve, reject) => {
      this.reqQueue.push(() => {
        this.sendRequest(type, addr, content)
        .then((response) => {
          resolve(response);
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

  sendRequest: function(type, addr, content) {
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

  clearQueue: function() {
    this.reqQueue.length = 0;
  },

  post: function(addr, content) {
    return this.addRequest('POST', addr, content);
  },

  get: function(addr) {
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

  submitTurn: function() {
    console.log('youdidityay');
  },
};

