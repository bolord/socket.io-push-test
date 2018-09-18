module.exports = app => {
    return async (ctx, next) => {
        const { socket } = ctx;

        console.log('[CONNECT] - socket.id:', socket.id);
        console.log('socket.handshake.query:', socket.handshake.query);

        const { group } = socket.handshake.query;

        console.log(group);
        if (group) {
            socket.join(group, () => {
                console.log('join callback');
                socket.to(group).emit('message', `[GROUP-CONNECT] - ${socket.id}`);
            });
        }

        ctx.socket.emit('message', `[CONNECT] - ${socket.id}`);
        await next();
        // execute when disconnect.
        console.log('disconnection!');
    };
};
