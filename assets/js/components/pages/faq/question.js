'use strict';
import React, {Component, PropTypes} from 'react';
import {Panel} from 'react-bootstrap';
import Button from '../../common/button/customButton';
export default class Question extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }

    render() {

        return (
            <div className="question-table-row wrapper">
                <div className="inner">
                    <p className="regular-text">{this.props.question}</p>
                    <Button className="btn btn-main btn-answer"
                            firstColor="#00A79D"
                            secondColor='#00938A'
                            corner={166}
                            onClick={ ()=> this.setState({ open: !this.state.open })}>
                        {this.state.open?'Hide me': 'Answer me'}
                    </Button>
                    <Panel collapsible expanded={this.state.open}>
                        {this.props.answer}
                    </Panel>
                </div>
            </div>
        )
    }
}