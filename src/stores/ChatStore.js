import { Store } from 'flummox';

export default class ChatStore extends Store {
  constructor(flux) {
    super(); 

    const chatActionIds = flux.getActionIds('chatactions');
    this.register(chatActionIds.newChatReceived, this.handleNewChatReceived);

    this.state = {
        chatMessages: null
    };
  }


  handleNewChatReceived(chatObj) {
    let chatMessages = this.state.chatMessages;
    if (!chatMessages) {
      chatMessages = [chatObj];
    }
    else {
     chatMessages.push(chatObj);  
    }
    this.setState({chatMessages: chatMessages});
  }

}

