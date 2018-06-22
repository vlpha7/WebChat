import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import _ from 'lodash';

class ChatListItem extends Component {
  constructor(props) {
    super(props);
    this.checkOnline = this.checkOnline.bind(this);
    this.isClicked = this.isClicked.bind(this);
  }
  onClickItem(name) {
    const { onUpdateServerChatting, onUpdateFormStatus, socket, onUpdateReplyStatus } = this.props;
    onUpdateServerChatting(name);
    onUpdateFormStatus(false);
    onUpdateReplyStatus(false);
    const { roleId, resetUnseenMap } = this.props;
    console.log(name);
    resetUnseenMap({ serverChatting: name, roleId, currentServer: socket.io.uri });
  }
  checkOnline() {
    if (this.props.online === true) {
      return '#76FF03';
    }
    return '#F44336';
  }
  isClicked() {
    const { serverChatting, primaryText } = this.props;
    if (serverChatting === primaryText) {
      return {
        backgroundColor: '#E0E0E0',
        margin: '0 5%'
      };
    }
    return {
      margin: '0 5%'

    };
  }
  shouldComponentUpdate(nextProps) {
    return (!_.isEqual(this.props, nextProps));
  }
  render() {
    const { primaryText, unseenMap, roleId, name } = this.props;
    let value;
    if (_.isUndefined(unseenMap.get(primaryText))) value = [];
    else value = unseenMap.get(primaryText);
    const newValue = value.filter(item => String(item) === String(roleId));
    const numberUnseenMessage = newValue.length;
    return (
      <ListItem
        primaryText={(numberUnseenMessage === 0)
                      ? <p>{name}</p>
                      : <p>{name}&nbsp;&nbsp;<span style={{ color: 'red' }}>{numberUnseenMessage}</span></p>}
        rightIcon={ <CommunicationChatBubble color={this.checkOnline()}/> }
        onClick={() => this.onClickItem(primaryText)}
        style={this.isClicked()}
      />
    );
  }
}

export default ChatListItem;
