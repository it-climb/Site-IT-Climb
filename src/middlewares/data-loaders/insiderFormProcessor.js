'use strict';

const request = require('request');
const querystring = require('querystring');

module.exports = (req, res, next) => {
    
    const form = {
        formID: '61722223668',
        enableServerValidation: '1',
        enable303Redirect: '1',
        q1_name1: req.body.name,
        q4_email: req.body.email,
        q5_customTextbox5: req.body.city || '',
        q6_customDropdown6: req.body.usaState || '',
        website: '',
        simple_spc: '61722223668-61722223668'
    };
    const formData = querystring.stringify(form);
    
    request({
        headers: {
            'Content-Length': formData.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://app.hatchbuck.com/onlineForm/submit.php',
        body: formData,
        method: 'POST'
    }, (error, result, body) => {
        if (error) {
            res.status(400).json({error});
        } else {
            res.status(200).send('OK');
        }
    })
};