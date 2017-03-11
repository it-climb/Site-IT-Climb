'use strict';
import React from "react";
import {ReactDom} from "react-dom";
import _ from "lodash";
import {Alert} from "react-bootstrap";

class Errors extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        errors: React.PropTypes.object.isRequired
    };

    render() {
        let errors = _.filter(_.get(this.props, 'errors', {}), error => _.isArray(error)),
            rows = [];

        _.map(errors, errorArray =>
            _.forEach(errorArray, errorMsg => {
                rows.push(<li>{errorMsg}</li>);
            })
        );

        return (
            !_.isEmpty(errors) &&
            <Alert bsStyle="danger">
                <ul className="error-list text-center">{rows}</ul>
            </Alert>
        );
    }

}

export default Errors;
