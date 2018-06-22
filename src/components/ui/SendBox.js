import React, { Component } from 'react';
import SendForm from '../containers/SendForm';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import fakeData from '../../fakeData.json';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import _ from 'lodash';
import '../../stylesheets/style.css';

let color;

class SendBox extends Component {
  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this);
    this.loadRoles = this.loadRoles.bind(this);
  }
  createMessage(origin_id = '', id = '') {
    if (this.refs.message.value === '') return;
    const { socket,
            roleId,
            serverChatting,
            createMessage,
            onUpdateReplyStatus,
            roleChatting,
            form,
            isForm,
            onUpdateFormStatus,
            onLoadForm } = this.props;
    form.msg_content = this.refs.message.value;
    this.refs.message.value = '';
    onLoadForm(form);
    const data = {
      send_server: socket.io.uri,
      send_role: roleId,
      time: Date.now(),
      content: {
        msg_code: (_.isUndefined(form.msg_code)) ? Math.random() : form.msg_code,
        msg_content: form.msg_content,
        msg_items: (isForm) ? form.msg_items : [],
        msg_warning_level: (_.isUndefined(form.msg_warning_level)) ? Math.random() : form.msg_warning_level
      },
      receive_server: serverChatting,
      receive_role: (roleChatting === -1) ? roleId : roleChatting,
      reply: id,
      origin_id: '',
      socketId: socket.id
    };
    createMessage({ data, origin_id });
    onUpdateReplyStatus(false);
    onUpdateFormStatus(false);
  }
  loadRoles(role) {
    const { onUpdateRoleChatting, roleId } = this.props;
    if (_.isUndefined(color)) {
      if (roleId === role.id) color = role.color;
    }
    return (
      <Chip style={{ margin: '0 0.5%', display: 'inline-block' }}
            backgroundColor={role.color}
            key={role.id}
            onClick={() => {
              onUpdateRoleChatting(role.id);
              color = role.color;
            }}>
        {role.name}
      </Chip>
    );
  }
  renderReply() {
    const { reply, onUpdateReplyStatus } = this.props;
    return (
      <div>
        <IconButton onClick={() => onUpdateReplyStatus(false)}>
          <ContentClear />
        </IconButton>
        <p style={{
          border: '1px solid ',
          borderRadius: 10,
          padding: '5px 5px 5px 5px',
          margin: '0 1% '
        }}>
            {reply.content.msg_content}
        </p>
      </div>
    );
  }
  renderMain() {
    const { isForm, onUpdateFormStatus, onLoadForm } = this.props;
    return (
      <div>
        <IconButton
          onClick={() => {
            onUpdateFormStatus(!isForm);
            onLoadForm(fakeData);
          }}>
          {(isForm) ? <ContentRemove/> : <ContentAdd/>}
        </IconButton>
      </div>
    );
  }
  renderRole() {
    const { dataRole } = this.props;
    return (
      <div>
        <div style={{ display: 'block', margin: '0 1%' }}>
          {dataRole.map(this.loadRoles)}
        </div>
      </div>
    );
  }
  render() {
    const { isReply, isForm, reply } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Paper style={{ width: '84%', float: 'left', margin: '1%' }} zDepth={0}>
          {(isReply) ? this.renderReply() : this.renderRole()}
          <input style={{ width: '98%', margin: '0.5% 1%' }} ref ="message"/>
          {this.renderMain()}
          {(isForm) ? <SendForm /> : null}
        </Paper>
        <Paper style={{ width: '8%', height: '88%', float: 'left', margin: '1%' }}>
          <FlatButton
            style={{ backgroundColor: color, width: '100%', height: '100%' }}
            label={'Send'}
            onClick={() => {
              if (isReply) this.createMessage(reply.origin_id, reply._id);
              else this.createMessage();
            }}/>
        </Paper>
      </div>
    );
  }
}

export default SendBox;
