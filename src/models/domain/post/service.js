'use strict';
const config = require('./../../../config/index'),
    stripe = require('stripe')(config.stripe.secret),
    _ = require('lodash'),
    boom = require('boom'),
    mongoose = require('mongoose'),
    PostModel = mongoose.model('Post');

let PostService = {

    getAll: ()=> {
        return PostModel.find();
    },

    create:(post, userData)=>{
        return PostModel.create({...post, userData})
    }

};

module.exports = PostService;