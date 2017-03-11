'use strict';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import routes from "../../assets/js/routes";
import reducers from "../../assets/js/reducers/index";
import thunk from 'redux-thunk';
import React from "react";
import { renderToString } from "react-dom/server";
import { RouterContext, match } from "react-router";
import createLocation from "history/lib/createLocation";
import { forEach } from 'lodash';
import DocumentMeta from 'react-document-meta';
import * as Constants from '../../assets/js/constants';

module.exports = (req, res, next) => {
    const location = createLocation(req.url);
    
    match({routes, location}, (err, redirectLocation, renderProps) => {
            if (err || req.err) {
                err = err || req.err;
                res.status(500).send(err.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                
                const store = applyMiddleware(thunk)(createStore)(reducers);
    
                store.dispatch({
                    type: Constants.POPULATE_USER_AGENT,
                    agent: req.headers['user-agent']
                });
                
                const InitialView = (
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                );
                
                forEach(req.dependencies, entry=> store.dispatch(entry));
                
                const initialState = store.getState();
                const componentHTML = renderToString(InitialView);
                const meta = DocumentMeta.renderAsHTML();
    
                res.setHeader("Access-Control-Allow-Origin", "*");
                
                res.render('layout', {meta, versionNumber: 1, componentHTML, initialState});
                
            } else {
                res.status(404).send('Not found')
            }
            
        }
    );
};