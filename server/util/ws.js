

io.on("connection", (socket) => {
    socket.on("client choose a new color", (data) => {
        io.emit("foo", data);
    });
});