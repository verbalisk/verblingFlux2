import React from 'react';
import {FluxComponent} from 'flummox/addons/react';
import classnames from 'classnames'; 

export default class ChatMessage extends React.Component {
  constructor(props) {
  	super(props);
  }

  // dguillamot - render markup for one chat message
  render() {
    let thisChatMessageMarkup;
    if (this.props.message) {
      let message = this.props.message;
      thisChatMessageMarkup = (
                             <li key={"chatMessageLI-"+this.props.chatNum} className={classnames('css-chat-slot')}>
                               {message.author}: {message.message}
                             </li>
                           );
    }
    return thisChatMessageMarkup;
  }
}