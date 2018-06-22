import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import ChatListItem from '../containers/ChatListItem';

let color = '#E3F2FD';
let roleName;

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.loadServers = this.loadServers.bind(this);
    this.convertData = this.convertData.bind(this);
    this.isServerOnline = this.isServerOnline.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  isServerOnline({ server, port }) {
    const { onlineServer, offlineServer, socket } = this.props;
    const data = {
      server,
      port,
      socketId: socket.id,
      onlineServer,
      offlineServer
    };
    return this.props.isServerOnline(data);
  }
  loadServers(server) {
    // TODO check connection only if refreshing page. Can do auto by setInterval but be carefull
    this.isServerOnline({ server: server.host + ':' + server.port, port: server.port });
    const { onlineServer, resetUnseenMap } = this.props;
    const index = onlineServer.indexOf(server.host + ':' + server.port);
    if (index > -1) {
      return (
        <ChatListItem
          primaryText={server.host + ':' + server.port}
          name={server.name}
          unseenMap={this.props.unseenMap}
          resetUnseenMap={resetUnseenMap}
          online={true}
          key={Math.random()}
        />
      );
    }
    return (
      <ChatListItem
        primaryText={server.host + ':' + server.port}
        name={server.name}
        unseenMap={this.props.unseenMap}
        resetUnseenMap={resetUnseenMap}
        online={false}
        key={Math.random()}
      />
    );
  }
  convertData() {
    const { dataServer } = this.props;
    const data = [];
    const num = Object.keys(dataServer).length;
    let i = 0;
    while (i < num) {
      data.push(dataServer[Object.keys(dataServer)[i]]);
      i += 1;
    }
    return data;
  }
  getColor() {
    const { dataRole, roleId } = this.props;
    dataRole.forEach(item => {
      if (item.id === roleId) {
        color = item.color;
        roleName = item.name;
      }
    });
  }
  render() {
    const { dataServer } = this.props;
    this.getColor();
    return (
      <Paper style = {{ maxHeight: '100%', overflow: 'auto' }} zDepth={0} >
        <List>
          <h2 style={{ backgroundColor: color, margin: '5%', padding: '5%', border: '1px solid black' }} align="center">{roleName}</h2>
          {dataServer.map(this.loadServers)}
        </List>
      </Paper>
    );
  }

}

export default ChatList;
