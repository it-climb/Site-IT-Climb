import React, { PropTypes, Component, PureComponent } from "react";
import Button from "../button/customButton";
import { Col, FormGroup, FormControl, HelpBlock } from "react-bootstrap";
import { STATES } from "../../../constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions/insider-signup-actions";


class SignUp extends React.Component {
    
    static propTypes = {
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        usaState: PropTypes.string.isRequired,
        isNameValid: PropTypes.bool.isRequired,
        isEmailValid: PropTypes.bool.isRequired,
        isCityValid: PropTypes.bool.isRequired,
        isSubmitted: PropTypes.bool.isRequired,
        changeField: PropTypes.func.isRequired,
        submitForm: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        
        this.onInputChange = e => {
            this.props.changeField(e.target.name, e.target.value);
        };
    }
    
    render() {
        return (
            <section className="signup-form-wrapper">
                <div className="inner">
                    <div className="container">
                        <div
                            className="sign-up-form row"
                        >
                            <h4 className="fourth-headliner">
                                Sign up for the Insider
                            </h4>
                            <Col md={4} xs={12}>
                                <FormGroupWithValidation
                                    isValidationNeeded={this.props.isSubmitted}
                                    isValid={this.props.isNameValid}
                                >
                                    <FormControl
                                        onChange={this.onInputChange}
                                        type="text"
                                        placeholder="name"
                                        value={this.props.name}
                                        name="name"
                                    />
                                    <FormControl.Feedback/>
                                    {this.props.isNameValid ?
                                        <HelpBlock className="name">{`Name field is required and can only contain letters: "${this.props.name}" given`}</HelpBlock>
                                        :
                                        null
                                    }
                                </FormGroupWithValidation>
                            </Col>
                            <Col md={4} xs={12}>
                                <FormGroupWithValidation
                                    isValidationNeeded={this.props.isSubmitted}
                                    isValid={this.props.isEmailValid}
                                >
                                    <FormControl
                                        name="email"
                                        onChange={this.onInputChange}
                                        type="email"
                                        placeholder="email"
                                        value={this.props.email}
                                    />
                                    <FormControl.Feedback/>
                                    {this.props.isEmailValid ?
                                        <HelpBlock>{`E-mail field is required and can only contain a valid email address: "${this.props.email}" given`}</HelpBlock>
                                        :
                                        null
                                    }
                                </FormGroupWithValidation>
                            </Col>
                            <Col md={4} xs={12}>
                                <FormGroupWithValidation
                                    isValidationNeeded={this.props.isSubmitted}
                                    isValid={this.props.isCityValid}
                                >
                                    <FormControl
                                        name="city"
                                        onChange={this.onInputChange}
                                        placeholder="city"
                                        value={this.props.city}
                                    />
                                    <FormControl.Feedback/>
                                    {this.props.isCityValid ?
                                        <HelpBlock>{`City field can only contain letters: "${this.props.city}" given`}</HelpBlock>
                                        :
                                        null
                                    }
                                </FormGroupWithValidation>
                            </Col>
                            <Col md={4} xs={12} className="p0">
                                <FormGroup controlId="formControlsSelect">
                                    <FormControl
                                        onChange={this.onInputChange}
                                        componentClass="select"
                                        name="usaState"
                                    >
                                        <option value="">USA State</option>
                                        {STATES.map(state=>
                                            <option
                                                value={state}
                                                key={state}
                                            >
                                                {state}
                                            </option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col md={4} xs={12} className="p0">
                                <Button
                                    onClick={this.props.submitForm}
                                    className="btn btn-main center-block"
                                    firstColor="#FCAD01"
                                    secondColor='#DA8B05'
                                    corner={166}
                                >
                                    I’M ON BOARD!
                                </Button>
                            </Col>
                        </div>
                    </div>
                </div>
            
            </section>
        )
    }
}

const mapStateToProps = state => ({
    name: state.insiderSignUp.fields.name,
    city: state.insiderSignUp.fields.city,
    email: state.insiderSignUp.fields.email,
    usaState: state.insiderSignUp.fields.usaState,
    isNameValid: state.insiderSignUp.errors.name,
    isEmailValid: state.insiderSignUp.errors.email,
    isCityValid: state.insiderSignUp.errors.city,
    isSubmitted: state.insiderSignUp.isSubmitted
});

const mapDispatchToProps = dispatch => bindActionCreators({...Actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

class FormGroupWithValidation extends PureComponent {
    
    static defaultProps = {
        isValidationNeeded: false,
        isValid: true
    };
    
    static propTypes = {
        isValidationNeeded: PropTypes.bool,
        isValid: PropTypes.bool,
        children: PropTypes.array.isRequired
    };
    
    render() {
        if (this.props.isValidationNeeded) {
            return (
                <FormGroup
                    validationState={this.props.isValid ? 'error' : 'success'}
                >
                    {this.props.children}
                </FormGroup>
            )
        } else {
            return (
                <FormGroup>
                    {this.props.children}
                </FormGroup>
            )
        }
        
        
    }
}