import KenobiWSSource from '../sources/KenobiWSSource';

var KenobiActions = {
  listenForKenobi: function(flux, url) {
    KenobiWSSource.listenForKenobi(flux, url);
  },

  updateKenobiLocation: function(newLocation) {
    return newLocation;
  }
}

export default KenobiActions;