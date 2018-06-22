import C from './constants';

export const loadDataServer = (data) =>
({
    type: C.LOAD_DATA_SERVER,
    payload: data
});

export const loadDataRole = (data) =>
({
    type: C.LOAD_DATA_ROLE,
    payload: data
});

export const loadDataFromSend = (data) =>
({
    type: C.LOAD_DATA_FROM_SEND,
    payload: data
});

export const loadDataFromReceive = (data) =>
({
    type: C.LOAD_DATA_FROM_RECEIVE,
    payload: data
});

export const addOnlineServer = (data) =>
({
    type: C.ADD_ONLINE_SERVER,
    payload: data
});

export const addOfflineServer = (data) =>
({
    type: C.ADD_OFFLINE_SERVER,
    payload: data
});

export const deleteOnlineServer = (data) =>
({
    type: C.DELETE_ONLINE_SERVER,
    payload: data
});

export const deleteOfflineServer = (data) =>
({
    type: C.DELETE_OFFLINE_SERVER,
    payload: data
});

export const addSocket = (socket) => ({
  type: C.ADD_SOCKET,
  payload: socket
});

export const updateServerChatting = (data) => ({
  type: C.UPDATE_SERVER_CHATTING,
  payload: data
});

export const updateReplyStatus = (data) => ({
  type: C.UPDATE_REPLY_STATUS,
  payload: data
});

export const loadReply = (data) => ({
  type: C.LOAD_REPLY,
  payload: data
});

export const updateFormStatus = (status) => ({
  type: C.UPDATE_FORM_STATUS,
  payload: status
});

export const loadForm = (data) => ({
  type: C.LOAD_FORM,
  payload: data
});

export const updateRoleChatting = (role) => ({
  type: C.UPDATE_ROLE_CHATTING,
  payload: role
});

export const updateFilter = (role) => ({
  type: C.UPDATE_FILTER,
  payload: role
});

export const updateLimitMessage = (limit) => ({
  type: C.UPDATE_LIMIT_MESSAGE,
  payload: limit
});
