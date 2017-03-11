'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('./../base-model/model'),
    Media = require('./../media/model');

const defaultAuthor = {
    firstName: '',
    lastName: '',
    about: '',
    avatar: null
};

class Author extends BaseModel{

    constructor(author){
        super(author);

        if(author && author.fields){
            let {fields} = author;
            this.id = author.sys.id;
            this.firstName = fields.firstName || '';
            this.lastName = fields.lastName || '';
            this.about = fields.about || '';
            this.avatar = new Media(_.get(fields, 'avatar', null));
        }else{
            Object.assign(this, defaultAuthor);
        }
    }
}

module.exports = Author;