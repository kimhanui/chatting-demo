const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, { path: "/socket.io" });
  app.set("io", io);
  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    console.log(`${socket.id} chat 네임스페이스에 접속`);
    const roomId = "1111"; //Math.random();
    socket.join(roomId);

    socket.emit("join", {whoami: socket.id});
    socket.to(roomId).emit("join", { 
      user: "system",
      chat: `${socket.id} 님이 입장하셨습니다.`,
    });

    socket.on("chat-push", (data) => {
      const mirrorMode = data.mirrorMode;
      const msg = data.msg;

      if(mirrorMode === true){ // 다른 사용자없이 자기 말만 반복함.(다른 사용자에게 안보여짐)
        const res = {
          user: "server",
          msg: `"${msg}" 를 수신했습니다`
        };
        // socket.to(socket.id).emit('chat-get', res); // IDK but not working
        socket.emit('chat-get', res);
      }
      else{
        const res = {
          user: data.user,
          msg: data.msg
        };
        socket.to(roomId).emit("chat-get", res);
      }
    });

    socket.on("disconnect", (data) => {
      console.log("chat 네임스페이스 접속 해제");
      socket.leave(roomId);
      socket.to(roomId).emit("exit", {
        user: "system",
        chat: `${socket.id} 님이 퇴장하셨습니다.`,
      });
    });
  });
};
