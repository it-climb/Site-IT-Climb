'use strict';
import _ from "lodash";
import {browserHistory} from "react-router";

let commonUtils = {

    /**
     * @param {Object|String} err
     * @param {String} modelName
     * @param {Object|Component} $component
     * @param {Function} $component.setState
     */
    errorHandler: (err, modelName, $component) => {
        console.debug(err);
        if (err) {
            let errors = {},
                details = _.get(err, 'response.body.details', {});
            if (_.isString(err)) {
                _.set(errors, `${modelName}`, {message: [err]});
            } else if (_.isEmpty(details)) {
                _.set(errors, `${modelName}`, {message: [_.get(err, 'response.body.message', 'Oops! Please refresh the page and try one more time.')]});
            } else {
                _.set(errors, `${modelName}`, details);
            }

            $component.setState({errors: _.merge($component.state.errors, errors)});
        }
    },

    logInHandler: (error, data, $this) => {
        if (!error) {
            browserHistory.push('/');
        } else {
            commonUtils.errorHandler(error, 'login', $this);
        }
    },

    /**
     * Whether user is admin or not
     * @param {Object} user
     * @returns {boolean}
     */
    isAdmin: user => {
        return /^(admin|moderator)$/i.test(_.get(user, 'Role.name'));
    },
    /**
     * Whether user is an owner of the campaign with given campaignId
     * @param {Object} user
     * @param {String} campaignId
     * @returns {boolean}
     */
    isCampaignOwner: (user, campaignId) => {
        return _.some(_.get(user, 'CampaignUserPermissions'), {campaignId: campaignId});
    },

    /**
     @param {*} x
     @return {Boolean}
     */
    isPositiveNumber: x => {
        return !isNaN(parseFloat(x)) && isFinite(x) && x > 0;
    },

    isClient: ()=> (typeof window != 'undefined' && window.document)

};

export default commonUtils;