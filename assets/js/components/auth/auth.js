'use strict';
import React from "react";
import { Row, Col } from "react-bootstrap";
import Errors from "../common/errors/errors";
import _ from "lodash";
import SignIn from "./login/login";
import SignUp from "./registration/registration";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            signIn: false,
            email: null
        };
        this._handleChangeForm = this._handleChangeForm.bind(this);
    }

    componentDidMount(){
       let type =  this.props.params.type;
        this.setState({signIn: type === 'login'});
    }

    _handleChangeForm() {
        this.setState({signIn: !this.state.signIn});
    }

    _checkEmailFromLocalStorage(){
        let email = localStorage.getItem('signUpEmail');

        if (!_.isNull(email)) {
            this.setState({email: email, signIn: false});
            localStorage.removeItem('signUpEmail');
        }
    }

    render() {
        this._checkEmailFromLocalStorage();
        let state = this.state;
        return (
            <div className="auth">
                <CommonHeader user={this.props.currentUser} stores={this.props.stores}/>
                <div className="container">
                    <Row>
                        <Col sm={12} md={10} mdOffset={2}>
                            <h2 className="second-headliner">Sign {state.signIn ? 'in': 'up'}</h2>
                            <Errors errors={_.get(this.state, 'errors.login', {})}/>
                            {
                                !state.signIn &&
                                <div className="auth-text">
                                    Already registered?
                                    <button className="btn btn-link" onClick={this._handleChangeForm}>Log in</button>
                                    here.
                                </div>
                            }
                            {
                                state.signIn &&
                                <div className="auth-text">
                                    Not registered yet?
                                    <button className="btn btn-link" onClick={this._handleChangeForm}>Sign up</button>
                                    here.
                                </div>
                            }
                            <a href="http://%API_SERVER%/oauth/facebook" className="btn btn-facebook">
                                Sign up with facebook
                            </a>

                            <p className="auth-text">or</p>


                            {
                                state.signIn && <SignIn {...this.props} />
                            }
                            {
                                !state.signIn && <SignUp {...this.props} email={state.email}/>
                            }
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default Login;