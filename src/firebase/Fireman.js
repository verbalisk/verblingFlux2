import Firebase from 'firebase';
import ChatFire from './ChatFire';
import UserFire from './UserFire';

let instance = null;

export default class Fireman {
  // dguillamot - normally the constructor would be a promise that also does a Firebase authWithCustomToken
  // the custom token is generated on the server and passed down through the alt / flummox isomorphic state
  // Since we have no server (I'm limiting myself to client only changes) we will also have no 
  // authentication and no security rules on Firebase config. Just having a bit of fun ^^
  constructor() {
    if (!instance) { // dguillamot - simple singleton pattern
      instance = this;
    }

    this.rootRef = new Firebase('https://verbalisk.firebaseio.com/');

    return instance;
  }

  getRootRef() {
    return this.rootRef;
  }
  
  initRefs() {
    this.chatRef = this.rootRef.child('chats');
    this.chatFire = new ChatFire();

    this.userRef = this.rootRef.child('users');
    this.userFire = new UserFire();
  }




  listenForChats(flux) {
    if (!this.chatFire) {
      this.initRefs();
    }
    this.chatFire.chatListen(this.chatRef, flux);
  }

  addChat(chatObj) {
    if (!this.chatFire) {
      this.initRefs();
    }
    this.chatFire.chatAdd(this.chatRef, chatObj);
  }




  listenForUsers(flux) {
    if (!this.userFire) {
      this.initRefs();
    }
    this.userFire.userListen(this.userRef, flux);
  }
 
  login(flux) {
    if (!this.userFire) {
      this.initRefs();
    }
    this.userFire.login(this.userRef, flux);
  }

  setOnDisconnect(userObj) {
    if (!this.userFire) {
      this.initRefs();
    }
    this.userFire.setOnDisconnect(this.userRef, userObj);
  }

}

