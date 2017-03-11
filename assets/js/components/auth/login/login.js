'use strict';
import React from "react";
import {browserHistory} from "react-router";
import _ from "lodash";
import Errors           from '../../common/errors/errors';
import classNames from "classnames";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        (()=>{})();
    }

    _handleChange(ev) {
        let input = ev.target,
            update = {},
            errors = {login: {}};
        _.set(update, `${input.name}`, input.value);
        _.set(update, 'errors', errors);
        this.setState(update);
    }

    _handleSubmit(ev) {
        ev.preventDefault();
        // SETUP SESSION
        this.state.errors = {};
        let $this = this,
            accountCredentials = { email: this.state.email, password: this.state.password };
    }

    render() {
        let state = this.state,
            inputClass = classNames({
                'invalid' : !_.isEmpty(state.errors.login)
            },'form-control');
        return (
            <div className="log-in-page">
                <Errors errors={_.get(this.state, 'errors.login', {})}/>
                <form action="" method="post" className="login-panel-form" onSubmit={this._handleSubmit}>

                    <ThxInput type="text" name="email"
                              value={state.email} onChange={this._handleChange}
                              label="Email:"
                              className={inputClass}/>
                    <ThxInput type="password" name="password"
                              value={state.password} onChange={this._handleChange}
                              label="Password:"
                              className={inputClass}/>
                    <input type="submit" value="Login" className="btn btn-secondary"/>
                </form>
            </div>
        );
    }
}