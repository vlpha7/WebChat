import { combineReducers } from 'redux';
const { window } = global;
import C from '../constants';

export const dataServer = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_DATA_SERVER:
      return action.payload;
    default:
      return state;
  }
};

export const dataRole = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_DATA_ROLE:
      return action.payload;
    default:
      return state;
  }
};

export const dataFromSend = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_DATA_FROM_SEND:
      return action.payload;
    default:
      return state;
  }
};

export const dataFromReceive = (state = [], action) => {
  switch (action.type) {
    case C.LOAD_DATA_FROM_RECEIVE:
      return action.payload;
    default:
      return state;
  }
};

export const onlineServer = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ONLINE_SERVER:
      return [
        ...state,
        action.payload
      ];
    case C.DELETE_ONLINE_SERVER:
      return state.filter(value => {
        return value !== action.payload;
      });
    default:
      return state;
  }
};

export const offlineServer = (state = [], action) => {
  switch (action.type) {
    case C.ADD_OFFLINE_SERVER:
      return [
        ...state,
        action.payload
      ];
    case C.DELETE_OFFLINE_SERVER:
      return state.filter(value => {
        return value !== action.payload;
      });
    default:
      return state;
  }
};

export const roleId = (state = window.roleId, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const socket = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export const serverChatting = (state = '', action) => {
  switch (action.type) {
    case C.UPDATE_SERVER_CHATTING:
      return action.payload;
    default:
      return state;
  }
};

export const isReply = (state = false, action) => {
  switch (action.type) {
    case C.UPDATE_REPLY_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export const reply = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_REPLY:
      return action.payload;
    default:
      return state;
  }
};

export const isForm = (state = false, action) => {
  switch (action.type) {
    case C.UPDATE_FORM_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export const form = (state = {}, action) => {
  switch (action.type) {
    case C.LOAD_FORM:
      return action.payload;
    default:
      return state;
  }
};

export const roleChatting = (state = -1, action) => {
  switch (action.type) {
    case C.UPDATE_ROLE_CHATTING:
      return action.payload;
    default:
      return state;
  }
};

export const filter = (state = '', action) => {
  switch (action.type) {
    case C.UPDATE_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export const limitMessage = (state = 20, action) => {
  switch (action.type) {
    case C.UPDATE_LIMIT_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  dataServer,
  dataRole,
  dataFromSend,
  dataFromReceive,
  onlineServer,
  offlineServer,
  roleId,
  socket,
  serverChatting,
  isReply,
  reply,
  isForm,
  form,
  roleChatting,
  filter,
  limitMessage
});
