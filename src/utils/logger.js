'use strict';

const logger = require("morgan"),
    fs = require('fs'),
    path = require("path"),
    FileStreamRotator = require('file-stream-rotator'),
    Config = require('../config'),
    logDirectory = `${__dirname}/../../${Config.logDirectory}`;


fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(Config.logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: true
});

const logFormat = `:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status [:response-time ms] :res[content-length] ":referrer" ":user-agent"`;


module.exports = logger(logFormat, { stream: accessLogStream });