const _ = require('lodash');

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1536806129940_1927';

    // add your config here
    config.middleware = [
        'responseTime',
    ];

    config.io = {
        init: {}, // passed to engine.io
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: ['filter'],
            },
        },
        generateId: (request) => {
            const { cid } = request._query;

            if (cid === undefined || cid === null || !cid.length) {
                return `uu_${_.random(1000000, 9999999, false)}`;
            } else {
                return cid;
            }
        },
    };

    config.redis = {
        host: '120.79.227.16',
        port: '9631',
        auth_pass: 'maywide_123',
        db: 7,
    };

    return config;
};
