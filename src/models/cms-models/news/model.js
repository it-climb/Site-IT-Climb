'use strict';
const
    _ = require('lodash'),
    uuid = require('uuid'),
    BaseModel = require('../base-model/model');

const defaultTicket = {
    id: uuid.v4(),
    title: ''
};


class News extends BaseModel {

   constructor(news) {
       super(news);

       if (news && news.fields) {
           let {fields} = news;
           this.title = fields.title || '';
       }else{
           Object.assign(this, defaultTicket);
       }
   }

}

module.exports = News;


