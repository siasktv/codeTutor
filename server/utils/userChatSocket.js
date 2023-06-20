let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUserBySocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};


module.exports = {
  addUser,removeUser,getUser, getUserBySocketId, users
}