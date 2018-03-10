game.Net = {
  postAction: function(actionRequest, callback) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = this.buildActionResponse(callback);
    xhttp.open('POST', window.location.href + 'turns/new-action', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(actionRequest));
  },

  buildActionResponse: function(callback) {
    return function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          // Everything happened normally
          var newTurn = JSON.parse(this.responseText);
          callback(newTurn);
        } else if(this.status == 400) {
          // Bad request -- Since nothing came back, tell callback of error
          var response = {
            'error': 'BAD REQUESTS ALL OVER',
          };
          callback(response);
        }
      }
    };
  },
};

