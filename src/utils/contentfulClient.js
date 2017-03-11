const Contentful = require('contentful');
const Config = require('../config');

const client = Contentful.createClient({
    space: Config.contentful.spaceId,
    accessToken: Config.contentful.deliveryKey,
    host: Config.contentful.host
});

module.exports = client;