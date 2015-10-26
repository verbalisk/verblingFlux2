import React from 'react';
import {FluxComponent} from 'flummox/addons/react';
import ChatMessage from './ChatMessage'; 
import ChatInputField from './ChatInputField'; 
import classnames from 'classnames'; 

export default class ChatPanel extends React.Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount() {
    this.props.flux.getActions('chatactions').listenForChats(this.props.flux); 
    this.props.flux.getActions('useractions').login(this.props.flux); 
    this.props.flux.getActions('useractions').listenForUsers(this.props.flux); 
  }

  componentDidUpdate() {
    let chatMessagesNode = this.refs.chatMessages;
    chatMessagesNode.scrollTop = chatMessagesNode.scrollHeight;
  }

  render() {
    let chatMessagesMarkup = [];
    if (this.props.chatMessages) {
      for (let g = 0; g < this.props.chatMessages.length; g++) {
        chatMessagesMarkup.push(<ChatMessage key={"chatMessage"+g} message={this.props.chatMessages[g]} chatNum={g} />);
      }
    }

    let usersMarkup = [];
    if (this.props.users) {
      for (let g = 0; g < this.props.users.length; g++) {
        usersMarkup.push(<div className={classnames('css-user-list-item', {'css-user-list-item-me': this.props.myUsername === this.props.users[g].username})} key={"userItem-"+g}>{this.props.users[g].username}</div>);
      } 
    }

    return (
      <FluxComponent>
        <div className="css-root">
          <h1 className="css-planet-monitor">Rebel Alliance #StarChat</h1>
          <section className="css-scrollable-list">
            <div className="css-chat-container">
              <div ref="chatMessages" className="css-chat-messages-container">
                <ul className="css-chat-slots">
                  {chatMessagesMarkup}
                </ul>
              </div>
              <ChatInputField flux={this.props.flux} myUsername={this.props.myUsername} />
            </div>
            <div className="css-chat-user-list-container">
              {usersMarkup}
            </div>
          </section>
        </div>
      </FluxComponent>
    );
  }
}