'use strict';

const express = require('express'),
    boom = require('express-boom'),
    morgan = require("morgan"),
    logger = require('./utils/logger'),
    db = require('./models/domain/models'),
    pageRoutes = require("./routes/page-routes"),
    restRoutes = require("./routes/rest-routes"),
    useragent = require('express-useragent'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    path = require('path'),
    Constants = require('./utils/contants'),
    app = express(),
    requestManager = require('./middlewares/request-manager'),
    prerenderer = require('./middlewares/prerenderer');

if (process.env.NODE_ENV !== 'production') {
    require('./../webpack.dev.js')(app);
}

app.set('view engine', 'ejs');
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist'), {maxAge: Constants.MONTH}));
app.use(logger);
app.use(boom());
if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(useragent.express());
app.use(pageRoutes);
app.use('/api', restRoutes);
app.use(requestManager);
app.use(prerenderer);


module.exports = app;