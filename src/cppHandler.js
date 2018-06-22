import _ from 'lodash';
const { window } = global;
import * as act from './actions';
import fakeData from './fakeData.json';

window.emitMessageReceived = (qStringData) => {
	console.log(qStringData)
	if (!_.isNull(window.ChatClientHandler) && !_.isUndefined(window.ChatClientHandler)) {
		window.ChatClientHandler.messageReceived(qStringData);
	}
};

window.emitCommandTriggered = (qStringData) => {
  if (!_.isNull(window.ChatClientHandler) && !_.isUndefined(window.ChatClientHandler)) {
		window.ChatClientHandler.commandTriggered(qStringData);
	}
};

window.emitServerStatusChanged = (qStringId, status) => {
  if (!_.isNull(window.ChatClientHandler) && !_.isUndefined(window.ChatClientHandler)) {
    window.ChatClientHandler.serverStatusChanged(qStringId, status);
	}
};

window.emitChatSyncInfoLoaded = () => {
	const dataServer = window.store.getState().dataServer;
	const dataRole = window.store.getState().dataRole;

  if (!_.isNull(window.ChatClientHandler) && !_.isUndefined(window.ChatClientHandler)) {
		// window.alert('run');
    window.ChatClientHandler.chatSyncInfoLoaded(JSON.stringify({ servers: dataServer, roles: dataRole }));
	}
};

window.funcOpenMessageCreator = (jsonDataFromCpp, jsonData = fakeData) => {
	window.store.dispatch(
		act.loadForm(jsonData)
	);
  window.store.dispatch(
		act.updateFormStatus(true)
	);
};

window.funcSendMessage = (jsonData) => {
	const obj = JSON.parse(jsonData);
	const socket = window.store.getState().socket;
	const data = {
		send_server: socket.io.uri,
		send_role: window.roleId,
		time: Date.now(),
		content: obj.msg,
		receive_server: obj.server,
		receive_role: obj.role,
		origin_id: '',
		socketId: socket.id
	};
	window.functionSendMessage({ data });
};

window.funcChatFormFocused = () => {
	console.log("Chat form was forcused!");
}
