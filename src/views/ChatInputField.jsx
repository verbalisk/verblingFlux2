import React from 'react';
import {FluxComponent} from 'flummox/addons/react';
import classnames from 'classnames'; 

const ENTER_KEY_CODE = 13;

export default class ChatInputField extends React.Component {
  constructor(props) {
  	super(props);

    this.state = {
    }
  }

  componentDidMount(){
     this.refs.chatInput.focus(); 
  }

  // dguillamot - render markup for the chat input field / input box
  render() {
    let chatFieldMarkup;
    chatFieldMarkup = (
                       <div>
                         <input ref="chatInput" type="text" className="css-chat-input" onKeyDown={this.onKeyDown.bind(this)} />
                       </div>
                      );
    return chatFieldMarkup;
  }

  onKeyDown(event){
    if (event.keyCode === ENTER_KEY_CODE) {
      this.sendChatMessage();
    }
  }

  sendChatMessage() {
    let chatMessage = this.refs.chatInput.value;
    this.props.flux.getActions('chatactions').addChat({author: this.props.myUsername, message: chatMessage}); 
    this.refs.chatInput.value = '';
  }
}