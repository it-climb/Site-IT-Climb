const NodeCache = require('node-cache');

// Time To Live - 5 minutes
const cache = new NodeCache({ stdTTL: 5*60, checkperiod: 5*60 });

module.exports = cache;
