const isProduction = process.env.NODE_ENV == 'production';

const previewKey = 'd667947a19639521e154fd2911130251141ca97c4b10d368efec18a782afaca4';
const productionKey = '641708ca4ea2f72ab3d6647179164411c983c5132ca11f62a5eb83174db10b67';

module.exports = {
    logDirectory: process.env.LOG_DIRECTORY || 'log',
    contentful: {
        spaceId: process.env.SPACE_ID || '5ojub2dmc7vv',
        deliveryKey: isProduction ? (process.env.DELIVERY_KEY || productionKey) : (process.env.PREVIEW_KEY || previewKey),
        host: isProduction ? 'cdn.contentful.com' : 'preview.contentful.com'
    },
    stripe: {
        secret: process.env.STRIPE_SECRET_KEY || 'sk_test_oCUuXvHozuQtbX22TeoShHmV',
        public: process.env.STRIPE_PUBLIC_KEY || 'pk_test_eduHJCOCEID6tKspPGxjZdts'
    },
    mongodb: {
        uri: process.env.WT_DB_URI || 'mongodb://localhost/testDB',
        user: process.env.WT_DB_USERNAME || '',
        pass: process.env.WT_DB_PASSWORD || ''
    },
    tripAdvisor: {
        key: process.env.WT_TRIP_ADVISOR || 'ab54d6d07ae54a73954cd9e36365baf7'
    }
};