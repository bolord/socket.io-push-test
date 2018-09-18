
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, io } = app;

    router.get('/push/all', io.controller.push.pushToAll);
    router.get('/push/one', io.controller.push.pushToOne);

    router.get('/test/push/all', io.controller.push.testPushToAll);
    router.get('/test/push/group/ack', io.controller.push.testPushToGroupWithAck);

    io.route('connect', io.controller.connection.connect);
    io.route('connection', io.controller.connection.connection);
    io.route('ping', io.controller.connection.ping);
    io.route('disconnect', io.controller.connection.disconnect);

};
