module.exports = app => {
    class ConnectionController extends app.Controller {
        async connection() {
            const { ctx } = this;
            const message = ctx.args[0];

            ctx.logger.info('===============================');
            ctx.logger.info('ENTERING - connection: ', message);

            await ctx.socket.emit('message', `connection! I've got your message: ${message}`);
        }

        async connect() {
            const { ctx } = this;
            const message = ctx.args[0];

            ctx.logger.info('===============================');
            ctx.logger.info('ENTERING - connect: ', message);

            await ctx.socket.emit('message', `connect! I've got your message: ${message}`);
        }

        async ping() {
            const { ctx } = this;
            const message = ctx.args[0];

            ctx.logger.info('===============================');
            ctx.logger.info('ENTERING - ping: ', message);

            await this.ctx.socket.emit('pong', 'ping pong!');
        }

        async disconnect() {
            const { ctx } = this;
            const message = ctx.args[0];

            ctx.logger.info('===============================');
            ctx.logger.info('ENTERING - disconnect: ', message);

            // await ctx.socket.emit('disconnect', `disconnect! I've got your message: ${message}`);
        }
    }

    return ConnectionController;
};
