'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('../base-model/model');

const defaultMedia = {
    id: uuid.v4(),
    url: null,
    description: '',
    title: ''
};


class Media extends BaseModel {

    constructor(media) {

        super(media);
        if (media && media.fields) {
            let {fields} = media;
            this.title = fields.title || '';
            this.description = fields.description || '';
            this.url = _.get(fields, 'file.url', null);
        } else {
            Object.assign(this, defaultMedia);
        }
    }

}

module.exports = Media;