'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import routes from './routes';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import '../styles/styles.scss';

import Perf from 'react-addons-perf';

window.Perf = Perf;

const initialState = window.__INITIAL_STATE__;

const store = applyMiddleware(thunk)(createStore)(reducers, initialState);

render(
    <Provider store={store}>
        <Router
            children={routes}
            history={browserHistory}/>
    </Provider>,
    document.getElementById('react-view'));
