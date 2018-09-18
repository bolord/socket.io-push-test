const { Controller } = require('egg');
const _ = require('lodash');

const DEF_PUSH_TO_ALL_DATA = () => {
    return {
        puid: '101010201809181737250001',
        data: {
            time: new Date(),
        },
        timestamp: +new Date(),
    }
};

const SAMPLE_PUSH_DATA = {
    QRLIST: [
        {
            AFTERTIMES: 0,
            AID: '101',
            CHANNELID: '6205,6210,6220,6230,6520,6860,6870',
            COUNTDOWN: 1,
            DELIVERID: '844',
            FODDERLIST: [
                {
                    BACKURL: 'http://172.31.252.35/mssppic/material/20180614090342685.png',
                    MATERIAL_ORDER: 1,
                    QRHP: 70,
                    QRSIZE: 150,
                    QRURL: 'http://weixin.qq.com/q/02yAR6tahRdVi1lha9xrci?qrtype=WC',
                    QRWP: 50,
                },
            ],
            LOGICDEVNO: '8270104243895428',
            QRTIME: '20180712 17:20:00',
            ROTATION_INTERVAL: 0,
            ROTATION_ORDER: 1,
            ROTATION_SWITCH: 1,
            WORKTIMES: 90000,
        },
    ],
};

class PushController extends Controller {

    /**
     * 广播，推送至所有客户端
     *
     * @memberof PushController
     */
    async pushToAll() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

        ctx.body = {
            success: true,
            timestamp: +new Date(),
        };
    }

    /**
     * 推送至列表指定的客户端（按序推送）
     *
     * @memberof PushController
     */
    async pushToGroup() {
        const { ctx, app } = this;
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

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
        const { data } = ctx.request.query;

        app.io.sockets.emit('message', data || DEF_PUSH_TO_ALL_DATA());

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
