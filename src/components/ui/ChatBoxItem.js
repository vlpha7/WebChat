import React, { Component } from 'react';
import _ from 'lodash';
import ContentReply from 'material-ui/svg-icons/content/reply';
import AVLoop from 'material-ui/svg-icons/av/loop';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './ChatBoxItem.scss';

const styles = {
  sendListItem: {
    margin: '1px 1px 1px 1px',
    padding: '0px 0px 0px 0px',
    maxWidth: '51%',
    minWidth: '51%',
    overflow: 'auto',
    float: 'right'
  },
  receiveListItem: {
    margin: '1px 1px 1px 1px',
    padding: '0px 0px 0px 0px',
    maxWidth: '51%',
    minWidth: '51%',
    overflow: 'auto',
    float: 'left'
  }
};

let color = '#E3F2FD';

class ChatBoxItem extends Component {
  constructor(props) {
    super(props);
    this.chooseStyleInnerDiv = this.chooseStyleInnerDiv.bind(this);
    this.chooseStyleListItem = this.chooseStyleListItem.bind(this);
    this.chooseStyleP = this.chooseStyleP.bind(this);
    this.opChooseStyleP = this.opChooseStyleP.bind(this);
    this.onClickReply = this.onClickReply.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderReplyIcon = this.renderReplyIcon.bind(this);
    this.renderResendIcon = this.renderResendIcon.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  getColor(role) {
    const { dataRole } = this.props;
    dataRole.forEach(item => {
      if (item.id === role) {
        color = item.color;
      }
    });
  }
  chooseStyleInnerDiv() {
    const { send } = this.props;
    return {
      border: '1px solid ' + color,
      borderRadius: 10,
      padding: '5px 5px 5px 5px',
      margin: '0px 5px 0px 5px',
      backgroundColor: color,
      display: 'inline-block',
      maxWidth: '90%',
      float: (send) ? 'right' : 'left'
    };
  }
  chooseStyleListItem() {
    if (this.props.send) {
      return styles.sendListItem;
    }
    return styles.receiveListItem;
  }
  chooseStyleP() {
    return {
      border: '1px solid ' + color,
      borderRadius: 10,
      backgroundColor: color,
      wordBreak: 'break-all',
      margin: '5px 5px 5px 5px',
      padding: '5px 5px 5px 5px'
    };
  }
  opChooseStyleP() {
    return {
      border: '1px solid ',
      borderRadius: 10,
      backgroundColor: color,
      wordBreak: 'break-all',
      margin: '5px 5px 5px 5px',
      padding: '5px 5px 5px 5px'
    };
  }
  onClickReply() {
    const { onUpdateReplyStatus, onLoadReply, onUpdateRoleChatting, data, isReply } = this.props;
    onUpdateRoleChatting(data.send_role);
    onUpdateReplyStatus(!isReply);
    onLoadReply(data);
  }
  onClickResend() {
    const { createMessage, data, socket } = this.props;
    const newData = {
      ...data,
      socketId: socket.id,
      send_server: socket.io.uri
    };
    createMessage({ data:newData });
  }
  renderTable(rawData) {
    return (
      <Table>
          <TableBody displayRowCheckbox={false}>
            {rawData.map((row, index) => (
              <TableRow key={index} selectable={false}>>
                <TableRowColumn style={{ padding: '0px 0px 0px 0px' }}>{row.name}</TableRowColumn>
                <TableRowColumn style={{ padding: '0px 0px 0px 0px' }}>{row.data}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
      </Table>
    );
  }
  renderDate(data, send) {
    let user = (send) ? data.receive_role : data.send_role;
    const { dataRole } = this.props;
    dataRole.forEach(item => {
      if (item.id === user) {
        user = item.name;
      }
    });
    return (
      <p>
        <b> { user + ', ' + data.time.split('T')[0] + ' at ' + data.time.split('T')[1].split('.')[0]}</b>
      </p>
    );
  }
  renderContent(data, isReply) {
    const { dataReply, content } = data;
    const { dataRole } = this.props;
    let user = (_.isUndefined(dataReply)) ? '' : dataReply.send_role;
    if (!_.isUndefined(dataRole)) {
      dataRole.forEach(item => {
        if (item.id === user) {
          user = item.name;
        }
      });
    }
    return (
      <div className="mess-content-body">
        {(isReply && dataReply) ?
          <div>
            <p style={{ fontSize:13, fontFamily: 'Georgia' }}>
              <b> {user + ', ' + dataReply.time.split('T')[0] + ' at ' + dataReply.time.split('T')[1].split('.')[0]}</b>
            </p>
            <p style={this.opChooseStyleP()}>
              {dataReply.content.msg_content}
              {(dataReply.content.msgitems !== [])
                ? this.renderTable(dataReply.content.msg_items)
                : null}
            </p>
          </div>
          : null}
        <p style={this.chooseStyleP()}>{content.msg_content}</p>
        {(content.msgitems !== [])
          ? null
          : null}
      </div>
    );
  }
  renderReplyIcon(data) {
    return (
      <IconButton className="reply-icon" onClick={() => this.onClickReply(data)}>
        <ContentReply />
      </IconButton>
    );
  }
  renderResendIcon(data) {
    return (
      <IconButton className="resend-icon" onClick={() => this.onClickResend(data)}>
        <AVLoop />
      </IconButton>
    );
  }
  render() {
    const { data, send, displayDate, displaySeen } = this.props;
    if (send) {
      this.getColor(data.receive_role);
    } else {
      this.getColor(data.send_role);
    }
    return (
      <div className={'list-item ' + (this.props.send ? 'send-list-item' : 'receive-list-item')} >
        <div className="mess-date">
          {(displayDate) ? this.renderDate(data, send) : null}
        </div>
        <div className="mess-content-wrapper">
          {(!data.is_sent && send) ? this.renderResendIcon() : null}
          {this.renderContent(data, data.reply !== '')}
          {(!send) ? this.renderReplyIcon() : null}
        </div>
        {(send && displaySeen)
            ? <div className="deliver-status"> {(data.is_read)
                ? 'seen ' + data.read_time.split('T')[0] + ' at ' + data.read_time.split('T')[1].split('.')[0]
                : 'delivered' }
              </div>
            : null}
      </div>
    );
  }
}

export default ChatBoxItem;
