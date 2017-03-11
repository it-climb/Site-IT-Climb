'use strict';
const
    _ = require('lodash'),
    client = require('../../utils/contentfulClient'),
    cache = require('../../utils/cache'),
    boom = require('boom'),
    injector = require('../../utils/dependencyInjector'),
    Question = require('../../models/cms-models/question/model'),
    pushContent = require('../../../assets/js/actions').pushContent;

module.exports = (req, res, next) => {

    let questions = cache.get('questions') || [];

    if (!_.isEmpty(questions)) {
        req.dependencies = injector(req, [req.isServerRequest ? pushContent({questions}) : {questions}]);
        return next();
    }
    
    client
        .getEntries({
            content_type: 'question',
            include: 3
        })
        .then(cmsQuestions=> {

            let total = _.get(cmsQuestions, 'total', 0),
                items = _.get(cmsQuestions, 'items', []);
            questions = [];
            if(total>0){
                for(let item of items){
                    questions.push(new Question(item));
                }
            }

            cache.set('questions', questions);

            req.dependencies = injector(req, [req.isServerRequest ? pushContent({questions}) : {questions}]);
            next();
        })
        .catch(err=>{
                console.log(err);
            next();
        });
    
};