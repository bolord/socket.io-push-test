const _ = require('lodash');
const dayjs = require('dayjs');

const TIMESTAMP_FORMAT = 'YYYYMMDDHHmmss';

module.exports = () => {
    return {
        /**
         * [type-6][time-14(YYYYMMDDHHmmss)][rand-4]
         */
        next: () => {
            const head = '101010';
            const timestamp = dayjs().format(TIMESTAMP_FORMAT);
            // FIXME: 不能随机，在分布式场景下
            const sequence = _.padStart(_.random(1, 9999), 4, '0');

            return `${head}${timestamp}${sequence}`;
        },
    };
};
