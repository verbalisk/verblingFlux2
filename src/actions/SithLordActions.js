import SithLordAPISource from '../sources/SithLordAPISource';

var SithLordActions = {
  fetchSithLord: function(requestObj) {
    return SithLordAPISource.fetch(requestObj);
  },

  scrollUp: function() {
    return true;
  },

  scrollDown: function() {
    return true;
  },

  cancelAllFetches: function() {
    return SithLordAPISource.cancelAllFetches();
  }
}

export default SithLordActions;