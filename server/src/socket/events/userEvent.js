export const userEvents = (socket, io) => {
    socket.on('userEvent', (username) => {
        if (!username) {
            return io.emit('error', "Invalid username")
        }
        socket.username = username;
        io.emit('username-set', username)   
    })
}