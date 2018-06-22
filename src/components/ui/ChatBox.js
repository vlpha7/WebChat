import React, { Component } from 'react';
import _ from 'lodash';
import ChatBoxItem from '../containers/ChatBoxItem';

let canLoadMore = false;
let temp;
let tempSend;
let lastIndexSeen;
let lastIndexUnseen;

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentDidUpdate() {
    const scroll = this.refs.scroll;
    scroll.scrollTop = scroll.scrollHeight;
  }
  shouldComponentUpdate(nextProps) {
    // TODO optimise render
    const oldServerChatting = this.props.serverChatting;
    const newServerChatting = nextProps.serverChatting;
    if (oldServerChatting !== newServerChatting) {
      const { onUpdateLimitMessage } = this.props;
      onUpdateLimitMessage(20);
      return true;
    }
    const oldFilter = this.props.filter;
    const newFilter = nextProps.filter;
    if (oldFilter !== newFilter) {
      const { onUpdateLimitMessage } = this.props;
      onUpdateLimitMessage(20);
      return true;
    }
    const oldLimitMessage = this.props.limitMessage;
    const newLimitMessage = nextProps.limitMessage;
    if (oldLimitMessage !== newLimitMessage) return true;
    const oldDataFromSend = this.props.dataFromSend;
    const oldDataFromReceive = this.props.dataFromReceive;
    const newDataFromSend = nextProps.dataFromSend;
    const newDataFromReceive = nextProps.dataFromReceive;
    const oldData = this.doCombinedData(oldDataFromSend, oldDataFromReceive);
    const newData = this.doCombinedData(newDataFromSend, newDataFromReceive);
    return (!_.isEqual(oldData, newData));
  }
  doCombinedData(fromSend, fromReceive) {
    // TODO checking this
    const { filter, limitMessage, serverChatting } = this.props;
    const data = [];
    const numSend = (!_.isUndefined(fromSend)) ? fromSend.length : 0;
    const numReceive = (!_.isUndefined(fromReceive)) ? fromReceive.length : 0;
    let i = 0;
    let j = 0;
    while (i < numSend && j < numReceive) {
      const first = fromSend[i];
      const second = fromReceive[j];
      if (first.time < second.time) {
        if (filter === '' || filter === first.receive_role) {
          if (serverChatting === first.receive_server) {
            data.push(first);
            if (first.is_read) lastIndexSeen = data.length - 1;
            else lastIndexUnseen = data.length - 1;
          }
        }
        i += 1;
      } else if (first.time > second.time) {
        if (filter === '' || filter === second.send_role) {
          if (serverChatting === second.send_server) {
            data.push(second);
          }
        }
        j += 1;
      }
    }
    while (i < numSend) {
      const first = fromSend[i];
      if (filter === '' || filter === first.receive_role) {
        if (serverChatting === first.receive_server) {
          data.push(first);
          if (first.is_read) lastIndexSeen = data.length - 1;
          else lastIndexUnseen = data.length - 1;
        }
      }
      i += 1;
    }

    while (j < numReceive) {
      const second = fromReceive[j];
      if (filter === '' || filter === second.send_role) {
        if (serverChatting === second.send_server) {
          data.push(second);
        }
      }
      j += 1;
    }
    if (data.length > limitMessage) {
      canLoadMore = true;
      lastIndexSeen -= (data.length - limitMessage);
      lastIndexUnseen -= (data.length - limitMessage);
      return (data.splice(data.length - limitMessage, data.length));
    } else {
      lastIndexSeen = data.length - 1;
      lastIndexUnseen = data.length - 1;
      canLoadMore = false;
      return data;
    }
  }
  loadData(data, index) {
    if (lastIndexSeen > lastIndexUnseen) lastIndexUnseen = lastIndexSeen;
    const { receive_server, send_server, receive_role } = data;
    let newData = data;
    const { serverChatting, roleId, dataFromReceive, dataFromSend, createMessage, filter } = this.props;
    let dataReply = [];
    if (data.reply !== '') {
      dataReply = dataFromSend.find(record => record._id === data.reply);
      if (!dataReply) {
        dataReply = dataFromReceive.find(record => record._id === data.reply);
      }
      newData = {
        ...newData,
        dataReply
      };
    }
    let displayDate = (index === 0 || temp !== newData.receive_role);
    if (receive_server === serverChatting) {
      temp = newData.receive_role;
      displayDate = (displayDate || !tempSend);
      tempSend = true;
      return (
        <ChatBoxItem
          createMessage={createMessage}
          data={newData}
          send={true}
          displaySeen={(filter !== '') ? (lastIndexSeen === index || lastIndexUnseen === index) : true}
          displayDate={displayDate}
          key={Math.random()}/>
      );
    }
    displayDate = (index === 0 || temp !== newData.send_role);
    if (send_server === serverChatting && receive_role === roleId) {
      temp = newData.send_role;
      displayDate = (displayDate || tempSend);
      tempSend = false;
      return (
        <ChatBoxItem
          createMessage={createMessage}
          data={newData}
          send={false}
          displaySeen={(filter !== '') ? (lastIndexSeen === index || lastIndexUnseen === index) : true}
          displayDate={displayDate}
          key={Math.random()}/>
      );
    }
  }
  handleLoadMore() {
    const { onUpdateLimitMessage, limitMessage } = this.props;
    onUpdateLimitMessage(limitMessage + 10);
  }
  render() {
    const { dataFromSend, dataFromReceive } = this.props;
    const data = this.doCombinedData(dataFromSend, dataFromReceive);
    return (
      <div style={{ maxHeight: '95%', overflow: 'auto' }} ref="scroll">
          { (canLoadMore) ?
                <button onClick={() => this.handleLoadMore()}
                        style={{ display: 'block',
                       marginLeft: 'auto',
                       marginRight: 'auto' }}>
                  Load More
                </button>
                          : null }
          {data.map((item, index) => this.loadData(item, index, data.length - 1))}
      </div>
    );
  }
}

export default ChatBox;
