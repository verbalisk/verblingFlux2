import Fireman from '../firebase/Fireman';

var UserActions = {
  listenForUsers: function(flux) {
    var fireman = new Fireman();
    fireman.listenForUsers(flux);
  },
  
  newUserReceived: function(userObj) {
  	return userObj;
  },

  userLeft: function(userObj) {
  	return userObj;
  },

  login: function(flux) {
    var fireman = new Fireman();
    fireman.login(flux);
  },

  loggedIn: function(flux, loginObj) {
  	var fireman = new Fireman();
  	fireman.setOnDisconnect(loginObj);
    flux.getActions('chatactions').scriptTriggerUserLoggedInChats(loginObj); 
  	return loginObj;
  }
}

export default UserActions;