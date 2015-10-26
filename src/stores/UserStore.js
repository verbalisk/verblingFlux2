import { Store } from 'flummox';

export default class UserStore extends Store {
  constructor(flux) {
    super(); 

    const userActionIds = flux.getActionIds('useractions');
    this.register(userActionIds.newUserReceived, this.handleNewUserReceived);
    this.register(userActionIds.userLeft, this.handleUserLeft);
    this.register(userActionIds.loggedIn, this.handleLoggedIn);

    this.state = {
        users: null,
        myUsername: null
    };
  }


  handleNewUserReceived(userObj) {
    let users = this.state.users;
    if (!users) {
      users = [userObj];
    }
    else {
     users.push(userObj);  
    }
    users.sort(function(a, b) {
      return (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0);
    });
    this.setState({users: users});
  }

  handleUserLeft(userObj) {
    let users = this.state.users;
    if (users) {
      let index = (-1);
      for (let g = 0; g < users.length; g++) {
        if(users[g].username === userObj.username) {
          index = g;
          break;
        }
      }
      if (index > (-1)) {
        users.splice(index, 1);
      }
    }
    this.setState({users: users});
  }

  handleLoggedIn(loginObj) {
    this.setState({myUsername: loginObj.username});
  }
}

