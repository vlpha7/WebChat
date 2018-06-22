export const emitToUsers = (io, description, data, users) => {
  // TODO check socket is dead or not
  if (users) {
    users.forEach((user) => {
      if (io.sockets.connected[user]) {
        io.sockets.connected[user].emit(description, data);
      }
    });
  }
};
