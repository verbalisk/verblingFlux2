export default class UserFire {
  userListen(userRef, flux) {
    userRef.on('child_added', function(snapshot) { // a new user joined the chatroom
      flux.getActions('useractions').newUserReceived(snapshot.val()); 
    });
    userRef.on('child_removed', function(snapshot) { // dguillamot when user closes browser, reloads page, etc
      flux.getActions('useractions').userLeft(snapshot.val()); 
    });
  }

  // dguillamot - very naive login method but works for this demo
  // Generate a random integer and add it to firebase users
  // store the key from the firebase push so we can remove it onDisconnect 
  login(userRef, flux) {
  	let rand = Math.floor(Math.random()*90000) + 10000;
  	let username = 'Jedi-'+rand;
  	let newRef = userRef.push({username: username});
  	let key = newRef.key();
  	flux.getActions('useractions').loggedIn(flux, {username: username, key: key}); // this lets the store save the username, and lets us bind the setOnDisconnect listener below
  }

  // dguillamot - when user disconnects (including page reload, browser close, etc), 
  // remove them from firebase users list and from the store (store removal happens from child_removed listener set above)
  setOnDisconnect(userRef, userObj) {
  	var disconnectRef = userRef.child(userObj.key);
  	disconnectRef.onDisconnect().remove();
  }
}

