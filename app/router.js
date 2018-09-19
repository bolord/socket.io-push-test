
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, io } = app;

    router.get('/push/all', io.controller.push.pushToAll);
    router.get('/push/group', io.controller.push.pushToGroup);
    router.get('/push/group/ack', io.controller.push.pushToGroupWithAck);
    router.get('/push/group/room', io.controller.push.pushToGroupUseRoomMode);
    router.get('/push/group/batch', io.controller.push.pushToGroupUseBatchMode);
    router.get('/push/group/batch/ack', io.controller.push.pushToGroupUseBatchModeWithAck);
    router.get('/push/one', io.controller.push.pushToOne);
    router.get('/push/one/ack', io.controller.push.pushToOneWithAck)

    io.route('connect', io.controller.connection.connect);
    io.route('connection', io.controller.connection.connection);
    io.route('ping', io.controller.connection.ping);
    io.route('disconnect', io.controller.connection.disconnect);

};
