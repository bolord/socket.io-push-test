module.exports = app => {
    return async (ctx, next) => {
        ctx.socket.emit('message', 'middleware.filter: packet received!');
        console.log('packet:', this.packet);
        await next();
    };
};
