/**
 * Created by evg on 15.09.16.
 */
'use strict';
const
    _ = require('lodash'),
    productionEnvs = ['production'],
    iS_DEV_ENV = !_.includes(productionEnvs, process.env.NODE_ENV);

let requestUtils = {

    /**
     * @param {Request} req
     * @returns {String}
     */
    getIP: req=> {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    },
    /**
     * @param {Request} req
     * @returns {String}
     */
    getUserAgent: req=> {
        return req.headers['user-agent'];
    },
    /**
     * method that accepts string and converts it to base64 encoding
     * @param {String} string
     * @return {String}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa}
     */
    btoa: string=>Buffer(string, 'binary').toString('base64'),
    /**
     * method that accepts base64-encoded string and converts it to normal
     * @param {String} string
     * @return {String}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob}
     */
    atob: string=>Buffer(string, 'base64').toString('binary'),

    isDevEnv: ()=>iS_DEV_ENV

};

module.exports = requestUtils;