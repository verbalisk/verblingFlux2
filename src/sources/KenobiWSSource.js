import WebSocket from 'ws';

var KenobiWSSource = {
  listenForKenobi: function(flux, url) {
    var ws = new WebSocket(url);
    ws.onopen =  function() {
    };
    ws.onmessage = function(message) {
      if(message && message.data) {
        flux.getActions('kenobiactions').updateKenobiLocation(JSON.parse(message.data)); 
      }
    };
    ws.onclose = function(){ 
    };
  }
}

export default KenobiWSSource;