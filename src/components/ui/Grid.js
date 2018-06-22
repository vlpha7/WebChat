const { document, window } = global;
import React, { Component } from 'react';
import * as api from '../../api';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import ChatList from '../containers/ChatList';
import ChatBox from '../containers/ChatBox';
import SendBox from '../containers/SendBox';
import _ from 'lodash';
import io from 'socket.io-client';
import '../../cppHandler';
const { port } = require('../../../config');

// TODO use window.location.href or get url from server
const socketUrl = 'http://localhost:' + port.server;
const socket = io(socketUrl);
let serverName;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%'
  },
  gridFullscreen: {
    width: '100%',
    height: '100%'
  },
  gridFullscreenLeft: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid grey'
  },
  gridTileUp: {
    width: '100%',
    height: '70%'
  },
  gridTileDown: {
    width: '100%',
    height: '30%',
    overflow: 'auto'
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);
    const { onLoadDataRole,
            onLoadDataServer,
            onUpdateServerChatting } = this.props;
    this.state = {
      lastSeenMap: new Map(),
      unseenMap: new Map()
    };
    api.getDataServer()
      .then(data => {
        onUpdateServerChatting(data[0].host + ':' + data[0].port);
        onLoadDataServer(data);
        const { serverChatting } = this.props;
        this.resetUnseenMap(serverChatting);
        const myMap = new Map();
        data.forEach(value => {
          myMap.set(value.name, -1);
        });
        this.setState({
          lastSeenMap: myMap
        });
    });
    api.getDataRole()
      .then(data => {
        onLoadDataRole(data);
    });
    this.updateData();
    this.updateData = this.updateData.bind(this);
    this.handleNewMessageSeen = this.handleNewMessageSeen.bind(this);
    this.handleNewMessageReceive = this.handleNewMessageReceive.bind(this);
    this.onlineServerLoad = this.onlineServerLoad.bind(this);
    this.offlineServerLoad = this.offlineServerLoad.bind(this);
    this.updateSeen = this.updateSeen.bind(this);
    this.resetUnseenMap = this.resetUnseenMap.bind(this);
    window.functionSendMessage = this.createMessage;
    setInterval(() => {
      const { dataFromReceive, serverChatting, roleId } = this.props;
      if (document.hasFocus()) {
        const data = {
          send_server: socket.io.uri,
          receive_server: serverChatting,
          send_role: roleId
        };
        const lastSeen = dataFromReceive[dataFromReceive.length - 1];
        if (!_.isUndefined(lastSeen)) {
          if (lastSeen._id !== this.state.lastSeenMap.get(serverChatting)) {
            this.updateSeen(data);
            const myMap = this.state.lastSeenMap;
            myMap.set(serverChatting, lastSeen._id);
            this.setState({
              lastSeendId: myMap
            });
          }
        }
      }
    }, 1000);
    this.handleNewMessageReceive();
  }
  componentDidMount() {
    const { onAddSocket, roleId } = this.props;
    socket.on('connect', () => {
      const my_role = roleId;
      socket.emit('login', my_role);
    });
    socket.on('new_message', this.updateData);
    socket.on('new_message_receive', this.handleNewMessageReceive);
    socket.on('new_message_seen', this.handleNewMessageSeen);
    socket.on('online', this.onlineServerLoad);
    socket.on('offline', this.offlineServerLoad);
    onAddSocket(socket);
  }
  handleNewMessageReceive(jsonData) {
    api.getUnseenMap()
      .then(data => {
        const myMap = new Map(data);
        this.setState({
          unseenMap: myMap
        });
      });
    this.updateData();
    if (!_.isUndefined(jsonData)) {
      console.log(jsonData);
      const data = {
        msg: jsonData.content,
        role: jsonData.receive_role,
        server: jsonData.receive_server
      };
      console.log(data);
      window.emitMessageReceived(JSON.stringify(data));
    }
  }
  handleNewMessageSeen() {
    this.updateData();
  }
  updateData() {
    const { onLoadDataFromReceive, onLoadDataFromSend } = this.props;
    api.getDataFromSend(this.props.roleId)
      .then(data => {
          onLoadDataFromSend(data);
      });
    api.getDataFromReceive(this.props.roleId)
      .then(data => {
        onLoadDataFromReceive(data);
      });
  }
  onlineServerLoad(data) {
    const { onlineServer,
            onDeleteOfflineServer,
            onAddOnlineServer } = this.props;
    onDeleteOfflineServer(data.server);
    const index = onlineServer.indexOf(data.server);
    if (index < 0) {
      onAddOnlineServer(data.server);
    }
    window.emitServerStatusChanged(JSON.stringify(data.serverId), true);
  }
  offlineServerLoad(data) {
    const { offlineServer,
            onDeleteOnlineServer,
            onAddOfflineServer } = this.props;
    onDeleteOnlineServer(data.server);
    const index = offlineServer.indexOf(data.server);
    if (index < 0) {
      onAddOfflineServer(data.server);
    }
    window.emitServerStatusChanged(JSON.stringify(data.serverId), false);
  }
  resetUnseenMap(data) {
    socket.emit('reset_unseen_map', data);
  }
  updateSeen(data) {
    socket.emit('update_seen', data);
  }
  createMessage({ data, origin_id = '' }) {
    socket.emit('create_message', { data, origin_id });
  }
  isServerOnline(data) {
    socket.emit('test_server', data);
  }
  handleFilter(event, choice) {
    const { onUpdateFilter, dataRole } = this.props;
    onUpdateFilter(choice)
  }
  getServerName() {
    const { dataServer, serverChatting } = this.props;
    dataServer.forEach(item => {
      if (item.host + ':' + item.port === serverChatting) {
        serverName = item.name;
      }
    });
  }
  render() {
    const { serverChatting, dataRole } = this.props;
    this.getServerName();
    return (
      <Paper style={styles.root}>
        <GridList
          style={styles.gridFullscreen}
          cols = {10}
          padding = {0}
          cellHeight = {'auto'}>
          <GridTile
            style= {styles.gridFullscreen}
            cols={2}>
            <ChatList
              resetUnseenMap={this.resetUnseenMap}
              unseenMap = {this.state.unseenMap}
              isServerOnline={this.isServerOnline}/>
          </GridTile>
          <GridTile
            style= {styles.gridFullscreenLeft}
            cols={8}>
            <Paper style={styles.gridTileUp}>
              <div>
                <b style={{ color: '#FF9800', fontSize:'18px', margin: '0 1%' }}>{serverName}</b>
                <label style={{ margin: '0 1%' }}>
                  <input type="radio" name="same"
                         onChange={(event) => this.handleFilter(event, '')}/>
                  {'All'}
                </label>
                {dataRole.map(role => (
                  <label style={{ margin: '0 1%' }}>
                    <input type="radio" name="same"
                           onChange={(event) => this.handleFilter(event, role.id)}/>
                    {role.name}
                  </label>))}
              </div>
              <Divider />
              <ChatBox createMessage={this.createMessage}/>
            </Paper>
            <Divider />
            <Paper style={styles.gridTileDown}>
              <SendBox
                createMessage={this.createMessage}/>
            </Paper>
          </GridTile>
        </GridList>
      </Paper>
    );
  }
}
export default Grid;
