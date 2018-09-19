const { Controller } = require('egg');
const _ = require('lodash');

class PushController extends Controller {

    /**
     * 广播，推送至所有客户端
     *
     * @memberof PushController
     */
    async pushToAll() {
        const { ctx } = this;
        const { event, data } = ctx.request.query;

        const result = await ctx.service.push.pushToAll(event, data);

        ctx.body = {
            success: true,
            timestamp: +new Date(),
            ...result,
        };
    }

    /**
     * 推送至列表指定的客户端（按序推送）
     *
     * @memberof PushController
     */
    async pushToGroup() {
        const { ctx, app } = this;
        const { cids, data } = ctx.request.query;
        const { sockets } = app.io;

        if (!_.isString(cids)) {
            throw new Error('参数 cids 格式不正确');
        }

        const cidlist = cids.split(',');

        cidlist.forEach(cid => {
            const socket = sockets.sockets[cid];
            if (socket && socket.connected) {
                socket.emit('message', data || DEF_PUSH_TO_ALL_DATA());
            }
        });

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至列表指定的客户端，附带应答（按序推送）
     *
     * @memberof PushController
     */
    async pushToGroupWithAck() {
        const { ctx, app } = this;
        const { cids, data } = ctx.request.query;
        const { sockets } = app.io;

        if (!_.isString(cids)) {
            throw new Error('参数 cids 格式不正确');
        }

        const cidlist = cids.split(',');

        cidlist.forEach(cid => {
            const socket = sockets.sockets[cid];
            if (socket && socket.connected) {
                socket.emit('message-ack', data || DEF_PUSH_TO_ALL_DATA(), answer => {
                    console.log(`[PushAPI] - pushToGroupWithAck: ACK = ${answer}`);
                });
            }
        });
        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }


    /**
     * 推送至列表指定的客户端，附带应答（按序推送）
     *
     * @memberof PushController
     */
    async pushToGroupWithAdaptAck() {
        const { ctx, app } = this;
        const { cids, data } = ctx.request.query;
        const { sockets } = app.io;

        if (!_.isString(cids)) {
            throw new Error('参数 cids 格式不正确');
        }

        const cidlist = cids.split(',');

        cidlist.forEach(cid => {
            const socket = sockets.sockets[cid];
            if (socket && socket.connected) {
                socket.emit('message-ack', data || DEF_PUSH_TO_ALL_DATA(), answer => {
                    console.log(`[PushAPI] - pushToGroupWithAck: ACK = ${answer}`);
                });
            }
        });
        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至列表指定的客户端（房间模式）
     *
     * @memberof PushController
     */
    async pushToGroupUseRoomMode() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至列表指定的客户端（分批模式）
     *
     * @memberof PushController
     */
    async pushToGroupUseBatchMode() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至列表指定的客户端，附带应答（分批模式）
     *
     * @memberof PushController
     */
    async pushToGroupUseBatchModeWithAck() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至单个指定的客户端
     *
     * @memberof PushController
     */
    async pushToOne() {
        const {
            app,
            ctx: { request },
        } = this;

        const { cid, msg } = request.query;

        if (_.isEmpty(cid)) {
            this.ctx.body = {
                success: false,
                timestamp: new Date(),
                cid,
                message: '[Request Parameter Error] cid is required.',
            };
            throw new Error('1', '2', '3');
        } else {
            // console.log('app.io.sockets:', app.io.sockets);

            try {
                const socket = app.io.sockets.sockets[cid];
                // console.log('cid:', cid, ',', typeof cid);
                // console.log('socket:', socket);
                socket.emit('message', `[PushAPI] - PushToOne: { cid: ${cid}, msg: ${msg} }`);
                this.ctx.body = {
                    success: true,
                    timestamp: new Date(),
                    cid,
                };
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * 推送至单个指定的客户端，附带应答
     *
     * @memberof PushController
     */
    async pushToOneWithAck() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }




    async testPushToAll() {
        const { ctx, app } = this;

        app.io.sockets.emit('test', SAMPLE_PUSH_DATA);

        ctx.body = {
            success: true,
            timestamp: new Date(),
        };
    }

    async testBatchPushWithAck() {
        const { app, ctx } = this;
        // const { cids } = ctx.request.query;

        // const clients = cids.split(',');

        // const s = app.io.sockets;

        // clients.forEach(cid => {

        // });

        app.io.in('test-ack-group').emit('test-ack', SAMPLE_PUSH_DATA, answer => {
            this.app.logger.info(`/test/push/all/ack - ACK: ${answer}`);
        });
    }

}

module.exports = PushController;
