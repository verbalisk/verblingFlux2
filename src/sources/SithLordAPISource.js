import request from 'superagent';

var requestsPending = [];

var SithLordAPISource = {
    fetch: function(requestObj) {
      return new Promise(function (resolve, reject) {
        if (requestsPending[requestObj.sithLordID]) {
          return;
        } 
        var req = request
           .get(requestObj.url)
           .end(function(err, res){
             if(res && res.text && !err) {
              var resObj = JSON.parse(res.text);
              requestsPending[resObj.id] = null;
              resolve(resObj);
             }
             else {
              reject(err);
             }
           });
        // dguillamot - we attache the triggering Sith Lord ID (callerID) and the type (was it a call for a master or an apprentice) so that we can cancelDanglingPending requets on scroll   
        requestsPending[requestObj.sithLordID] = {req: req, callerID: requestObj.callerID, type: requestObj.type};
      });
    },

    
    // dguillamot - cancel all pending requests (e.g. when Kenobi arrives at a planet with a Sith Lord who is currently on the Dashboard)
    cancelAllFetches: function () {
      for (var sithLordID in requestsPending) {
        if (requestsPending.hasOwnProperty(sithLordID) && requestsPending[sithLordID]) {
          requestsPending[sithLordID].req.abort();
          requestsPending[sithLordID] = null;
        }
      }
      return true;
    }, 


    // dguillamot - cancel any dangling pending API calls that are no longer needed (e.g. as a result of a scroll)
    cancelDanglingPending: function(sithLords, numSlots) {
      for (var sithLordID in requestsPending) {
        if (requestsPending.hasOwnProperty(sithLordID) && requestsPending[sithLordID]) {
          var callerSlot = (-1);
          for(var g=0; g<sithLords.length; g++) {
             if (!sithLords[g]) {
              continue;
             }
             if (sithLords[g].id === requestsPending[sithLordID].callerID) {
               callerSlot = g;
               break;
             }
          }
          if (requestsPending[sithLordID].type && requestsPending[sithLordID].type === 'master' && callerSlot < 1) {
             // dguillamot - this was a request for a Jedi Master, but the caller has dissapeared or is in the top slot
             requestsPending[sithLordID].req.abort();
             requestsPending[sithLordID] = null;
             return true;

          }
          else if (requestsPending[sithLordID].type && requestsPending[sithLordID].type === 'apprentice' && (callerSlot === (-1) || callerSlot >= (numSlots=1))) {
             // dguillamot - this was a request for a Jedi apprentice, but the caller has dissapeared or is in the bottom slot
             requestsPending[sithLordID].req.abort();
             requestsPending[sithLordID] = null;
             return true;
          }
        }
      }
      return false;
    }
}

export default SithLordAPISource;