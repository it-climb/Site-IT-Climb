'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('../base-model/model');

const defaultQuestion = {
    question: '',
    answer: ''
};

class Question extends BaseModel{
    constructor(question){
        super(question);

        if(question && question.fields){
            let {fields} = question;
            this.question = fields.question || '';
            this.answer = fields.answer || '';
        }else{
            Object.assign(this, defaultQuestion);
        }
    }
}

module.exports = Question;